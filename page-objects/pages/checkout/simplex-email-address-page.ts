import { Page, Locator } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class SimplexEmailAddressPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.locator('#email-collection-input, [data-testid="email-collection-input"]').first();
  }

  get termsAndConditionsCheckbox(): Locator {
    return this.page.locator(
      '#generalTermsAndConditionsCheckbox, [name="generalTermsAndConditionsCheckbox"]',
    ).first();
  }

  get nextButton(): Locator {
    return this.page
      .locator('button[form="email-collection-form"]')
      .or(this.page.getByRole('button', { name: /^next$/i }))
      .first();
  }

  @TestStep
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
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
  async fillEmailAndAcceptTerms(email: string, options?: { acceptTerms?: boolean }): Promise<void> {
    await this.fillEmail(email);
    if (options?.acceptTerms !== false) {
      await this.checkTermsAndConditions();
    }
  }
}
