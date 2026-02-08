#!/usr/bin/env node
/**
 * Reads Playwright test-reports/results.json and writes a PR comment body to pr-comment-body.md.
 * Expects env: RESULTS_JSON_PATH, TEST_RESULT, REPO, RUN_ID, REPO_OWNER, REPO_NAME (or derives from REPO).
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');

const resultsPath = process.env.RESULTS_JSON_PATH || join(root, 'test-reports', 'results.json');
const testResult = process.env.TEST_RESULT || 'success';
const repo = process.env.REPO || '';
const runId = process.env.RUN_ID || '';
const repoOwner = process.env.REPO_OWNER || repo.split('/')[0] || '';
const repoName = process.env.REPO_NAME || repo.split('/')[1] || repo;

function collectFailedTests(suites) {
  const failed = [];
  if (!Array.isArray(suites)) return failed;
  for (const suite of suites) {
    if (Array.isArray(suite.specs)) {
      for (const spec of suite.specs) {
        if (Array.isArray(spec.tests)) {
          for (const test of spec.tests) {
            const ok = test.results?.every((r) => r.status === 'passed' || r.status === 'skipped');
            if (!ok && test.title) failed.push(test.title);
          }
        }
      }
    }
    if (Array.isArray(suite.suites)) {
      failed.push(...collectFailedTests(suite.suites));
    }
  }
  return failed;
}

const workflowUrl = 'https://github.com/' + repo + '/actions/runs/' + runId;
const htmlReportUrl = 'https://' + repoOwner + '.github.io/' + repoName + '/report/run-' + runId + '/test-reports/index.html';
const showReportCmd = 'npx playwright show-report test-reports';

let body;
try {
  const raw = readFileSync(resultsPath, 'utf8');
  const report = JSON.parse(raw);
  const stats = report.stats || {};
  const passed = stats.expected ?? 0;
  const failedCount = stats.unexpected ?? 0;
  const skipped = stats.skipped ?? 0;
  const flaky = stats.flaky ?? 0;
  const failedTitles = collectFailedTests(report.suites || []);

  const statusEmoji = failedCount === 0 ? '✅' : '❌';
  const statusLine =
    failedCount === 0
      ? '**All tests passed**'
      : '**' + failedCount + ' failed**, ' + passed + ' passed, ' + skipped + ' skipped' + (flaky ? ', ' + flaky + ' flaky' : '');

  const lines = [
    '## ' + statusEmoji + ' Playwright test results',
    '',
    statusLine,
    '',
  ];
  if (failedTitles.length > 0) {
    lines.push('**Failed tests:**');
    for (const t of failedTitles) {
      lines.push('- `' + t + '`');
    }
    lines.push('');
  }
  lines.push('**Summary:** See the **Playwright Tests** check above or the [workflow run](' + workflowUrl + ') for details.');
  lines.push('');
  lines.push('**Full report (traces, screenshots, videos):** [Open HTML report →](' + htmlReportUrl + ') · or download the **playwright-report** artifact and run `' + showReportCmd + '` locally.');
  body = lines.join('\n');
} catch (_err) {
  const status = testResult === 'success' ? '✅ **All tests passed**' : '❌ **Tests failed**';
  body = [
    '## Playwright test results',
    '',
    status,
    '',
    '**Summary:** See the [workflow run](' + workflowUrl + ') for details.',
    '',
    '**Full report:** Download the **playwright-report** artifact and run `' + showReportCmd + '` locally.',
  ].join('\n');
}

const outPath = process.env.OUTPUT_PATH || join(root, 'pr-comment-body.md');
writeFileSync(outPath, body, 'utf8');
console.log('Wrote', outPath);
