import { Page, Locator } from '@playwright/test';
import { PageObject } from '../PageObject';
import { TestStep } from '../utils/test-step';
import { selectors } from '../selectors';

export class VerificationPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get otpInputContainer(): Locator {
    return this.page.locator(
      '.otp-input-container, .code-input-container',
    ).first();
  }

  get codeInputs(): Locator {
    return this.page.locator(selectors.codeInput);
  }

  get verifyButton(): Locator {
    return this.page
      .locator('button[form="email-verification-form"]')
      .or(this.page.getByRole('button', { name: /^verify$/i }));
  }

  get invalidCodeMessage(): Locator {
    return this.page.locator('span.text').filter({
      hasText: /the code is not valid\.?\s*try again or click resend code/i,
    }).first();
  }

  @TestStep
  async enterVerificationCode(code: string): Promise<void> {
    const digits = code.replace(/\D/g, '').split('');
    const inputs = this.codeInputs;
    const count = await inputs.count();
    for (let i = 0; i < Math.min(digits.length, count); i++) {
      await inputs.nth(i).fill(digits[i]);
    }
  }

  @TestStep
  async clickVerify(): Promise<void> {
    await this.verifyButton.click();
  }
}
