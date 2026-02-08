import { test, expect } from '../../fixtures/basic.fixture';
import {
  bitcoinAddress,
  adaAddress,
  card,
  billingAddress,
  personalDetails,
  cardDetailsLocalized,
} from '../../src/ui/test-data';
import { LANGUAGES } from '../../src/ui/components/LanguageSelector';

test.describe('Buy crypto (amount & address)', () => {
  test('user can navigate from home to buy crypto and see payment method step', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();
    await buyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();

    await expect(paymentMethodPage.creditDebitCardTile).toBeVisible();
    await expect(paymentMethodPage.euroBankTransferTile).toBeVisible();
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

test.describe('Card payment flow', () => {
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

  test('user selects ADA with PLN and proceeds to payment method', async ({
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cookieBanner,
  }) => {
    await homePage.goto();
    await homePage.clickBuyCryptoButton();

    await buyCryptoPage.selectCrypto('ADA');
    await buyCryptoPage.selectFiat('PLN');
    await buyCryptoPage.fillAmountAndAddress('1000', adaAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();

    await expect(paymentMethodPage.creditDebitCardSelectedTile).toBeVisible();
  });

  test('user changes language to Español on card details step', async ({
    page,
    homePage,
    buyCryptoPage,
    paymentMethodPage,
    cardDetailsPage,
    cookieBanner,
    languageSelector,
  }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/simplex/i);

    await homePage.clickBuyCryptoButton();
    await buyCryptoPage.fillAmountAndAddress('777', bitcoinAddress);
    await buyCryptoPage.clickContinue();
    await cookieBanner.acceptAll();

    await paymentMethodPage.clickContinue();

    await expect(cardDetailsPage.cardNumberInput).toBeVisible();

    await languageSelector.openMenu();
    await languageSelector.clickOnLanguageOption(LANGUAGES.ENGLISH);
    await languageSelector.clickOnLanguageOption(LANGUAGES.ESPANOL);

    const { header, nextButton, cardNumberLabel } = cardDetailsLocalized.es;
    await expect(cardDetailsPage.getHeaderHeading(header)).toBeVisible();
    await expect(cardDetailsPage.getSubmitButton(nextButton)).toBeVisible();
    await expect(cardDetailsPage.getCardNumberLabel(cardNumberLabel)).toBeVisible();
  });

  test('user enters wrong OTP code and sees error', async ({
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
});

test.describe('Euro Bank Transfer payment flow', () => {
  test('user enters wrong OTP code and sees error', async ({
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
});
