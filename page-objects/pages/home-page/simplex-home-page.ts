import { Page, Locator } from '@playwright/test';
import { PageObject } from '../../page-object';
import { TestStep } from '../../../utils/test-step';
import { CookieConsentBanner } from '../../components/home-page/cookie-consent-banner';

export class SimplexHomePage extends PageObject {
  private _cookieBanner: CookieConsentBanner | undefined;

  constructor(page: Page) {
    super(page);
  }

  get cookieBanner(): CookieConsentBanner {
    if (!this._cookieBanner) this._cookieBanner = new CookieConsentBanner(this.page);
    return this._cookieBanner;
  }

  get buyCryptoLink(): Locator {
    return this.page.getByRole('link', { name: /buy crypto/i });
  }

  @TestStep
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.cookieBanner.acceptAll();
  }

  @TestStep
  async clickBuyCryptoButton(): Promise<void> {
    await this.buyCryptoLink.click();
  }
}
