import { Page, Locator } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';
import { BirthdayPicker } from '../../components/checkout/birthday-picker';

export class SimplexPersonalDetailsPage extends PageObject {
  private _birthdayPicker: BirthdayPicker | undefined;

  constructor(page: Page) {
    super(page);
  }

  get birthdayPicker(): BirthdayPicker {
    if (!this._birthdayPicker) this._birthdayPicker = new BirthdayPicker(this.page);
    return this._birthdayPicker;
  }

  get firstMiddleNameInput(): Locator {
    return this.page.locator('#firstMiddleName, [data-testid="firstMiddleName"], input[name="firstMiddleName"]').first();
  }

  get lastNameInput(): Locator {
    return this.page.locator('#lastName, [data-testid="lastName"], input[name="lastName"]').first();
  }

  get phoneNumberInput(): Locator {
    return this.page.locator('#phoneNumber, [data-testid="phoneNumber"], input[name="phoneNumberModel"]').first();
  }

  get countryPrefixSelector(): Locator {
    return this.page.locator('.ant-select-selection-item').filter({ hasText: /LT\s*\+370/i }).first();
  }

  get dateOfBirthInput(): Locator {
    return this.page.locator('#dateOfBirth, [name="dateOfBirth"], .v3dp-input').first();
  }

  get emailInput(): Locator {
    return this.page.locator('#email-collection-input, [data-testid="email-collection-input"], input[name="email"]').first();
  }

  get payNowButton(): Locator {
    return this.page.getByRole('button', { name: /pay now/i }).or(this.page.locator('button.s-button.primary[form="personal-details-form"]')).first();
  }

  get requiredValidations(): Locator {
    return this.page.locator('form#personal-details-form .s-form-message-error, #personal-details-form .s-form-message-error');
  }

  @TestStep
  async fillPhoneNumber(value: string): Promise<void> {
    await this.phoneNumberInput.fill(value);
  }

  @TestStep
  async clickDateOfBirth(): Promise<void> {
    await this.dateOfBirthInput.click();
  }

  @TestStep
  async fillEmail(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  @TestStep
  async clickPayNow(): Promise<void> {
    await this.payNowButton.click();
  }

  @TestStep
  async fillPersonalDetails(details: {
    phoneNumber: string;
    dateOfBirth: { year: string; month: string; day: string };
    email: string;
  }): Promise<void> {
    await this.fillPhoneNumber(details.phoneNumber);
    await this.clickDateOfBirth();
    await this.birthdayPicker.selectYear(details.dateOfBirth.year);
    await this.birthdayPicker.selectMonth(details.dateOfBirth.month);
    await this.birthdayPicker.selectDay(details.dateOfBirth.day);
    await this.fillEmail(details.email);
    await this.clickPayNow();
  }
}
