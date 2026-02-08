import { Page, Locator } from '@playwright/test';
import { PageObject } from '../PageObject';
import { TestStep } from '../utils/test-step';

const formIframe = 'iframe[src*="simplex-affiliates.com/form"]';

export class BuyCryptoPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  private get formFrame() {
    return this.page.frameLocator(formIframe);
  }

  get fiatAmountInput(): Locator {
    return this.formFrame.locator('#fiat_amount, [name="fiat_amount"]').first();
  }

  get cryptoAmountInput(): Locator {
    return this.formFrame.locator('#crypto_amount, [name="crypto_amount"]').first();
  }

  get cryptoAddressInput(): Locator {
    return this.formFrame
      .locator('#cryptoAddress, [name="cryptoAddress"]')
      .or(this.formFrame.getByPlaceholder(/bitcoin|btc.*address/i))
      .first();
  }

  get continueButton(): Locator {
    return this.formFrame.getByRole('button', { name: /^continue$/i });
  }

  get cryptoDropdown(): Locator {
    return this.formFrame.locator('input.simplex-dd.crypto-dd, .crypto-dd.simplex-dd').first();
  }

  get fiatDropdown(): Locator {
    return this.formFrame.locator('input.simplex-dd.fiat-dd, .fiat-dd.simplex-dd').first();
  }

  @TestStep
  async goto(): Promise<void> {
    await this.page.goto('/buy-crypto');
  }

  @TestStep
  async enterFiatAmount(amount: string): Promise<void> {
    await this.fiatAmountInput.waitFor({ state: 'visible' });
    await this.fiatAmountInput.fill(amount);
  }

  @TestStep
  async enterCryptoAddress(address: string): Promise<void> {
    await this.cryptoAddressInput.fill(address);
  }

  @TestStep
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  @TestStep
  async fillAmountAndAddress(amount: string, address: string): Promise<void> {
    await this.enterFiatAmount(amount);
    await this.enterCryptoAddress(address);
    await this.page.waitForTimeout(1000);
  }

  @TestStep
  async selectCrypto(symbol: string): Promise<void> {
    await this.cryptoDropdown.click();
    await this.cryptoDropdown.fill(symbol);
    const option = this.formFrame.locator(
      `li.autocomplete-result[data-currency="${symbol.toUpperCase()}"]`,
    ).first();
    await option.click();
  }

  @TestStep
  async selectFiat(currency: string): Promise<void> {
    await this.fiatDropdown.waitFor({ state: 'visible' });
    await this.fiatDropdown.click();
    await this.fiatDropdown.fill(currency);
    const option = this.formFrame.locator(
      `li.autocomplete-result[data-currency="${currency.toUpperCase()}"]`,
    ).first();
    await option.waitFor({ state: 'visible' });
    await option.click(); 
  }
}
