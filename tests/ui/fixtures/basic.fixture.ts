import { test as base } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { BuyCryptoPage } from '../../../src/ui/pages/BuyCryptoPage';
import { PaymentMethodPage } from '../../../src/ui/pages/PaymentMethodPage';
import { CardDetailsPage } from '../../../src/ui/pages/CardDetailsPage';
import { BillingAddressPage } from '../../../src/ui/pages/BillingAddressPage';
import { PersonalDetailsPage } from '../../../src/ui/pages/PersonalDetailsPage';
import { EmailAddressPage } from '../../../src/ui/pages/EmailAddressPage';
import { VerificationPage } from '../../../src/ui/pages/VerificationPage';
import { CookieConsentBanner } from '../../../src/ui/components/CookieConsentBanner';
import { LanguageSelector } from '../../../src/ui/components/LanguageSelector';

export const test = base.extend<{
  homePage: HomePage;
  buyCryptoPage: BuyCryptoPage;
  paymentMethodPage: PaymentMethodPage;
  cardDetailsPage: CardDetailsPage;
  billingAddressPage: BillingAddressPage;
  personalDetailsPage: PersonalDetailsPage;
  emailAddressPage: EmailAddressPage;
  verificationPage: VerificationPage;
  cookieBanner: CookieConsentBanner;
  languageSelector: LanguageSelector;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  buyCryptoPage: async ({ page }, use) => {
    await use(new BuyCryptoPage(page));
  },
  paymentMethodPage: async ({ page }, use) => {
    await use(new PaymentMethodPage(page));
  },
  cardDetailsPage: async ({ page }, use) => {
    await use(new CardDetailsPage(page));
  },
  billingAddressPage: async ({ page }, use) => {
    await use(new BillingAddressPage(page));
  },
  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },
  emailAddressPage: async ({ page }, use) => {
    await use(new EmailAddressPage(page));
  },
  verificationPage: async ({ page }, use) => {
    await use(new VerificationPage(page));
  },
  cookieBanner: async ({ page }, use) => {
    await use(new CookieConsentBanner(page));
  },
  languageSelector: async ({ page }, use) => {
    await use(new LanguageSelector(page));
  },
});

export const expect = test.expect;
