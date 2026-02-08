import { Page, Locator } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';

export class SimplexPaymentMethodPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  get creditDebitCardSelectedTile(): Locator {
    return this.page
      .locator('.s-selection-tile-container.selected')
      .filter({ hasText: /credit\/debit card/i });
  }

  get euroBankTransferTile(): Locator {
    return this.page
      .locator('.s-selection-tile-container, .offer-tile')
      .filter({ hasText: /euro bank transfer|SEPA/i });
  }

  get continueButton(): Locator {
    return this.page.getByRole('button', { name: /^continue$/i });
  }

  @TestStep
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  @TestStep
  async selectEuroBankTransfer(): Promise<void> {
    await this.euroBankTransferTile.click();
  }
}
