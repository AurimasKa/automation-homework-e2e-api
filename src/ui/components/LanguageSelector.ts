import { Page, Locator } from '@playwright/test';
import { TestStep } from '../utils/test-step';

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

  get languageOptions(): Locator {
    return this.page.locator('a.s-link');
  }

  @TestStep
  async clickLanguageOption(): Promise<void> {
    await this.languageOptions.click();
  } 

  @TestStep
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  getLanguageOptionLocator(language: string | RegExp): Locator {
    const pattern = typeof language === 'string' ? new RegExp(language, 'i') : language;
    return this.page
      .locator('a.s-link')
      .filter({ has: this.page.locator('.label', { hasText: pattern }) })
      .first();
  }

  @TestStep
  async clickOnLanguageOption(language: string | RegExp): Promise<void> {
    await this.getLanguageOptionLocator(language).click();
  }
}
