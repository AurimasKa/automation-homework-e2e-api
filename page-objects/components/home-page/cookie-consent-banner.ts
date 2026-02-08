import { Page, Locator } from '@playwright/test';

export class CookieConsentBanner {
  constructor(private readonly page: Page) {}

  get container(): Locator {
    return this.page.locator('#onetrust-button-group-parent').first();
  }

  get acceptAllButton(): Locator {
    return this.page.locator('#onetrust-accept-btn-handler').first();
  }

  get rejectAllButton(): Locator {
    return this.page.locator('#onetrust-reject-all-handler').first();
  }

  get cookiesSettingsButton(): Locator {
    return this.page.locator('#onetrust-pc-btn-handler').first();
  }

  async acceptAll(): Promise<void> {
    try {
      await this.acceptAllButton.click();
    } catch {
    }
  }
}
