import { Page, Locator } from '@playwright/test';
import { TestStep } from '../../../utils/test-step';

export const LANGUAGES = {
  ESPANOL: 'Español',
  ENGLISH: 'English',
} as const;

export class LanguageSelector {
  constructor(private readonly page: Page) {}

  get menuButton(): Locator {
    return this.page
      .locator('button')
      .filter({ has: this.page.locator('svg path[d*="M2.349 14.385"]') })
      .first();
  }

  @TestStep
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  @TestStep
  async selectLanguage(language: string): Promise<void> {
    await this.openMenu();
    await this.page
      .locator('li.s-menu-item')
      .filter({ hasText: new RegExp(language, 'i') })
      .first()
      .click();
  }
}
