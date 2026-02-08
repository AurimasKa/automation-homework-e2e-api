import { Page, Locator } from '@playwright/test';

export class ExpirationDatePicker {
  constructor(private readonly page: Page) {}

  get popup(): Locator {
    return this.page.locator('.s-picker-popup-month, .s-picker-popup').first();
  }

  buttonWithValue(value: string): Locator {
    return this.page
      .locator('.s-picker-popup-button, .v3dp-element-button')
      .filter({ hasText: new RegExp(`^${value}$`) })
      .first();
  }

  async selectMonth(month: string): Promise<void> {
    await this.buttonWithValue(month).click();
  }

  async selectYear(year: string): Promise<void> {
    await this.buttonWithValue(year).click();
  }
}
