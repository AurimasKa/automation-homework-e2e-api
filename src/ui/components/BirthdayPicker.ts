import { Page, Locator } from '@playwright/test';

export class BirthdayPicker {
  constructor(private readonly page: Page) {}

  get popup(): Locator {
    return this.page.locator('.v3dp-popup, .s-picker-popup').first();
  }

  buttonWithText(text: string): Locator {
    return this.page.locator('.s-picker-popup-button.v3dp-element-button').filter({ hasText: new RegExp(`^${text}$`) }).first();
  }

  async selectYear(year: string): Promise<void> {
    await this.buttonWithText(year).click();
  }

  async selectMonth(month: string): Promise<void> {
    await this.buttonWithText(month).click();
  }

  async selectDay(day: string): Promise<void> {
    await this.buttonWithText(day).click();
  }
}
