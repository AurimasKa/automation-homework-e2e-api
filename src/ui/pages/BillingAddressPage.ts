import { Page, Locator } from '@playwright/test';
import { PageObject } from '../PageObject';
import { TestStep } from '../utils/test-step';
import { testIds } from '../utils/testIds';

export class BillingAddressPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get countrySelection(): Locator {
    return this.page.locator('.ant-select-selection-item').filter({
      hasText: /lithuania/i,
    }).first();
  }

  get cityInput(): Locator {
    return this.page.locator(`#city, [data-testid="${testIds.city}"], [name="city"]`).first();
  }

  get streetInput(): Locator {
    return this.page.locator(`#street, [data-testid="${testIds.street}"], [name="street"]`).first();
  }

  get zipCodeInput(): Locator {
    return this.page.locator(`#zipCode, [data-testid="${testIds.zipCode}"], [name="zipCode"]`).first();
  }

  get nextButton(): Locator {
    return this.page
      .locator('button[form="billing-address-form"]')
      .or(this.page.getByRole('button', { name: /^next$/i }));
  }

  get requiredValidations(): Locator {
    return this.page.locator('form#billing-address-form .s-form-message-error, #billing-address-form .s-form-message-error');
  }

  @TestStep
  async enterCity(city: string): Promise<void> {
    await this.cityInput.waitFor({ state: 'visible' });
    await this.cityInput.fill(city);
  }

  @TestStep
  async enterStreet(street: string): Promise<void> {
    await this.streetInput.fill(street);
  }

  @TestStep
  async enterZipCode(zip: string): Promise<void> {
    await this.zipCodeInput.fill(zip);
  }

  @TestStep
  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  @TestStep
  async fillBillingAddress(address: { city: string; street: string; zipCode: string }): Promise<void> {
    await this.enterCity(address.city);
    await this.enterStreet(address.street);
    await this.enterZipCode(address.zipCode);
    await this.clickNext();
  }
}
