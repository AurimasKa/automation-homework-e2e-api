import { Page, Locator } from '@playwright/test';
import { PageObject } from '../PageObject';
import { TestStep } from '../utils/test-step';
import { ExpirationDatePicker } from '../components/ExpirationDatePicker';
import { testIds } from '../utils/testIds';

export class CardDetailsPage extends PageObject {
  private _expirationDatePicker: ExpirationDatePicker | undefined;

  constructor(page: Page) {
    super(page);
  }

  get expirationDatePicker(): ExpirationDatePicker {
    if (!this._expirationDatePicker) this._expirationDatePicker = new ExpirationDatePicker(this.page);
    return this._expirationDatePicker;
  }

  get cardNumberInput(): Locator {
    return this.page.locator(`#cardNumber, [data-testid="${testIds.cardNumber}"], [name="cardNumber"]`).first();
  }

  get cvvInput(): Locator {
    return this.page.locator(`#cvv, [data-testid="${testIds.cvv}"], [name="cvv"]`).first();
  }

  get nameOnCardInput(): Locator {
    return this.page
      .locator(`#nameOnCard, [data-testid="${testIds.nameOnCard}"], [name="nameOnCard"]`)
      .first();
  }

  get expirationDateInput(): Locator {
    return this.page.locator('#expirationDate, [name="expirationDate"]').first();
  }

  get termsAndConditionsCheckbox(): Locator {
    return this.page.locator(
      '#generalTermsAndConditionsCheckbox, [name="generalTermsAndConditionsCheckbox"]',
    ).first();
  }

  get nextButton(): Locator {
    return this.page.getByRole('button', { name: /^next$/i });
  }

  getHeaderHeading(text: string | RegExp): Locator {
    return this.page.locator('.s-heading-3.header-text').filter({ hasText: text });
  }

  getSubmitButton(text: string | RegExp): Locator {
    return this.page.getByRole('button', { name: text });
  }

  getCardNumberLabel(text: string | RegExp): Locator {
    return this.page.getByLabel(text);
  }

  get termsRequiredValidation(): Locator {
    return this.page.locator('.general-terms-and-conditions-checkbox span.text').filter({ hasText: /^Required$/ }).first();
  }

  get cardCollectionRequiredValidations(): Locator {
    return this.page.locator('.card-collection .s-form-message-error');
  }

  @TestStep
  async enterCardNumber(cardNumber: string): Promise<void> {
    await this.cardNumberInput.waitFor({ state: 'visible' });
    await this.cardNumberInput.fill(cardNumber);
  }

  @TestStep
  async enterCvv(cvv: string): Promise<void> {
    await this.cvvInput.fill(cvv);
  }

  @TestStep
  async enterNameOnCard(name: string): Promise<void> {
    await this.nameOnCardInput.fill(name);
  }

  @TestStep
  async clickExpirationDate(): Promise<void> {
    await this.expirationDateInput.click();
  }

  @TestStep
  async selectMonthInPicker(month: string): Promise<void> {
    await this.expirationDatePicker.selectMonth(month);
  }

  @TestStep
  async selectYearInPicker(year: string): Promise<void> {
    await this.expirationDatePicker.selectYear(year);
  }

  @TestStep
  async checkTermsAndConditions(): Promise<void> {
    await this.termsAndConditionsCheckbox.check();
  }

  @TestStep
  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  @TestStep
  async fillCardDetails(
    card: { number: string; cvv: string; nameOnCard: string; expiryMonth: string; expiryYear: string },
    options?: { acceptTerms?: boolean },
  ): Promise<void> {
    await this.enterCardNumber(card.number);
    await this.enterCvv(card.cvv);
    await this.enterNameOnCard(card.nameOnCard);
    await this.clickExpirationDate();
    await this.selectMonthInPicker(card.expiryMonth);
    await this.selectYearInPicker(card.expiryYear);
    if (options?.acceptTerms) {
      await this.checkTermsAndConditions();
    }
  }
}
