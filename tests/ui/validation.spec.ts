import { test, expect } from './fixtures/basic.fixture';
import { bitcoinAddress, card, billingAddress } from '../../src/ui/test-data';

test.describe('Validation', () => {
  test('user cannot proceed from card details without required fields', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cardDetailsPage,
    billingAddressPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();

    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();
    await paymentMethodPage.clickContinue();

    await cardDetailsPage.clickNext();

    const cardValidations = cardDetailsPage.cardCollectionRequiredValidations;
    await expect(cardValidations).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(cardValidations.nth(i)).toBeVisible();
    }
    await expect(cardDetailsPage.termsRequiredValidation).toBeVisible();
    await expect(billingAddressPage.countrySelection).not.toBeVisible();
  });

  test('user cannot proceed from billing address without required fields', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cardDetailsPage,
    billingAddressPage,
    personalDetailsPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();

    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();
    await paymentMethodPage.clickContinue();

    await cardDetailsPage.fillCardDetails(card, { acceptTerms: true });
    await cardDetailsPage.clickNext();

    await expect(billingAddressPage.countrySelection).toBeVisible();
    await billingAddressPage.clickNext();

    const billingValidations = billingAddressPage.requiredValidations;
    await expect(billingValidations).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(billingValidations.nth(i)).toBeVisible();
    }
    await expect(personalDetailsPage.firstMiddleNameInput).not.toBeVisible();
  });

  test('user cannot proceed from personal details without required fields', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cardDetailsPage,
    billingAddressPage,
    personalDetailsPage,
    verificationPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();

    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();
    await paymentMethodPage.clickContinue();

    await cardDetailsPage.fillCardDetails(card, { acceptTerms: true });
    await cardDetailsPage.clickNext();

    await billingAddressPage.fillBillingAddress(billingAddress);

    await expect(personalDetailsPage.firstMiddleNameInput).toBeVisible();
    await personalDetailsPage.clickPayNow();

    const personalValidations = personalDetailsPage.requiredValidations;
    await expect(personalValidations).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(personalValidations.nth(i)).toBeVisible();
    }
    await expect(verificationPage.otpInputContainer).not.toBeVisible();
  });
});
