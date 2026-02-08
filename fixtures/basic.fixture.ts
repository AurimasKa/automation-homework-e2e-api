import { test as base, Page } from '@playwright/test';
import { SimplexHomePage } from '../page-objects/pages/home-page/simplex-home-page';
import { SimplexBuyCryptoPage } from '../page-objects/pages/buy-crypto-page/simplex-buy-crypto-page';
import { SimplexPaymentMethodPage } from '../page-objects/pages/checkout/simplex-payment-method-page';
import { SimplexCardDetailsPage } from '../page-objects/pages/checkout/simplex-card-details-page';
import { SimplexBillingAddressPage } from '../page-objects/pages/checkout/simplex-billing-address-page';
import { SimplexPersonalDetailsPage } from '../page-objects/pages/checkout/simplex-personal-details-page';
import { SimplexEmailAddressPage } from '../page-objects/pages/checkout/simplex-email-address-page';
import { SimplexVerificationPage } from '../page-objects/pages/checkout/simplex-verification-page';
import { CookieConsentBanner } from '../page-objects/components/home-page/cookie-consent-banner';
import { LanguageSelector } from '../page-objects/components/checkout/language-selector';

export const test = base.extend<{
  simplexHomePage: SimplexHomePage;
  simplexBuyCryptoPage: SimplexBuyCryptoPage;
  simplexPaymentMethodPage: SimplexPaymentMethodPage;
  simplexCardDetailsPage: SimplexCardDetailsPage;
  simplexBillingAddressPage: SimplexBillingAddressPage;
  simplexPersonalDetailsPage: SimplexPersonalDetailsPage;
  simplexEmailAddressPage: SimplexEmailAddressPage;
  simplexVerificationPage: SimplexVerificationPage;
  cookieBanner: CookieConsentBanner;
  languageSelector: LanguageSelector;
}>({
  simplexHomePage: async ({ page }, use) => {
    await use(new SimplexHomePage(page));
  },
  simplexBuyCryptoPage: async ({ page }, use) => {
    await use(new SimplexBuyCryptoPage(page));
  },
  simplexPaymentMethodPage: async ({ page }, use) => {
    await use(new SimplexPaymentMethodPage(page));
  },
  simplexCardDetailsPage: async ({ page }, use) => {
    await use(new SimplexCardDetailsPage(page));
  },
  simplexBillingAddressPage: async ({ page }, use) => {
    await use(new SimplexBillingAddressPage(page));
  },
  simplexPersonalDetailsPage: async ({ page }, use) => {
    await use(new SimplexPersonalDetailsPage(page));
  },
  simplexEmailAddressPage: async ({ page }, use) => {
    await use(new SimplexEmailAddressPage(page));
  },
  simplexVerificationPage: async ({ page }, use) => {
    await use(new SimplexVerificationPage(page));
  },
  cookieBanner: async ({ page }, use) => {
    await use(new CookieConsentBanner(page));
  },
  languageSelector: async ({ page }, use) => {
    await use(new LanguageSelector(page));
  },
});

export const expect = test.expect;
