import { test, expect } from './fixtures/basic.fixture';
import {
  bitcoinAddress,
  card,
  billingAddress,
  personalDetails,
} from '../../src/ui/test-data';

test.describe('Buy flow (negative)', () => {
  test('user enters wrong OTP code and sees error (card)', async ({
    page,
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
    await expect(page).toHaveTitle(/simplex/i);

    await homePage.clickBuyCryptoButton();
    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();

    await expect(paymentMethodPage.creditDebitCardSelectedTile).toBeVisible();
    await paymentMethodPage.clickContinue();

    await cardDetailsPage.fillCardDetails(card, { acceptTerms: true });
    await cardDetailsPage.clickNext();

    await expect(billingAddressPage.countrySelection).toBeVisible();
    await billingAddressPage.fillBillingAddress(billingAddress);

    await expect(personalDetailsPage.firstMiddleNameInput).toHaveValue(personalDetails.firstMiddleName);
    await expect(personalDetailsPage.lastNameInput).toHaveValue(personalDetails.lastName);
    await personalDetailsPage.fillPersonalDetails(personalDetails);

    await expect(verificationPage.otpInputContainer).toBeVisible();
    await expect(verificationPage.verifyButton).toBeVisible();
    await verificationPage.enterVerificationCode('0000');
    await verificationPage.clickVerify();

    await expect(verificationPage.invalidCodeMessage).toBeVisible();
  });

  test('user enters wrong OTP code and sees error (Euro Bank Transfer)', async ({
    page,
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    emailAddressPage,
    verificationPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/simplex/i);

    await homePage.clickBuyCryptoButton();
    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();

    await paymentMethodPage.selectEuroBankTransfer();
    await paymentMethodPage.clickContinue();

    await emailAddressPage.fillEmailAndAcceptTerms(personalDetails.email, { acceptTerms: true });
    await emailAddressPage.clickNext();

    await expect(verificationPage.otpInputContainer).toBeVisible();
    await expect(verificationPage.verifyButton).toBeVisible();
    await verificationPage.enterVerificationCode('0000');
    await verificationPage.clickVerify();

    await expect(verificationPage.invalidCodeMessage).toBeVisible();
  });

  test('user enters invalid crypto address and cannot proceed', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();

    await buyCryptoPage.enterFiatAmount('500');
    await buyCryptoPage.enterCryptoAddress('invalid-random-address-123');
    await buyCryptoPage.clickContinue();

    await expect(buyCryptoPage.fiatAmountInput).toBeVisible();
    await expect(paymentMethodPage.creditDebitCardSelectedTile).not.toBeVisible();
  });
});
