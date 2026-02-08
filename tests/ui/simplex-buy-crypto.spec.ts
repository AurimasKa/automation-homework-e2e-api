import { test, expect } from '../../fixtures/basic.fixture';
import {
  bitcoinAddress,
  adaAddress,
  card,
  billingAddress,
  personalDetails,
  cardDetailsLocalized,
} from '../../test-data';
import { LANGUAGES } from '../../page-objects/components/checkout/language-selector';

test.describe('Buy Crypto flow', () => {
  test.describe('Credit/Debit Card', () => {
    test('user enters wrong OTP code and sees error', async ({
      page,
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexCardDetailsPage,
      simplexBillingAddressPage,
      simplexPersonalDetailsPage,
      simplexVerificationPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await expect(page).toHaveTitle(/simplex/i);

      await simplexHomePage.clickBuyCryptoButton();
      await simplexBuyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
      await expect(simplexBuyCryptoPage.cryptoAmountInput).toHaveValue(/\d/);
      await expect(simplexBuyCryptoPage.cryptoAddressInput).toHaveValue(bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();

      await expect(simplexPaymentMethodPage.creditDebitCardSelectedTile).toBeVisible();
      await expect(simplexPaymentMethodPage.euroBankTransferTile).toBeVisible();
      await simplexPaymentMethodPage.clickContinue();

      await simplexCardDetailsPage.fillCardDetails(card, { acceptTerms: true });
      await simplexCardDetailsPage.clickNext();

      await expect(simplexBillingAddressPage.countrySelection).toBeVisible();
      await expect(simplexBillingAddressPage.countrySelection).toContainText(/lithuania/i);
      await simplexBillingAddressPage.fillBillingAddress(billingAddress);

      await expect(simplexPersonalDetailsPage.firstMiddleNameInput).toHaveValue(personalDetails.firstMiddleName);
      await expect(simplexPersonalDetailsPage.lastNameInput).toHaveValue(personalDetails.lastName);
      await expect(simplexPersonalDetailsPage.countryPrefixSelector).toHaveAttribute('title', 'LT +370');
      await simplexPersonalDetailsPage.fillPersonalDetails(personalDetails);

      await expect(simplexVerificationPage.otpInputContainer).toBeVisible();
      await expect(simplexVerificationPage.verifyButton).toBeVisible();
      await simplexVerificationPage.enterVerificationCode('0000');
      await simplexVerificationPage.clickVerify();

      await expect(simplexVerificationPage.invalidCodeMessage).toBeVisible();
    });

    test('user enters invalid crypto address and cannot proceed', async ({
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
    }) => {
      await simplexHomePage.goto();
      await simplexHomePage.clickBuyCryptoButton();

      await simplexBuyCryptoPage.enterFiatAmount('500');
      await simplexBuyCryptoPage.enterCryptoAddress('invalid-random-address-123');
      await simplexBuyCryptoPage.clickContinue();

      await expect(simplexBuyCryptoPage.fiatAmountInput).toBeVisible();
      await expect(simplexPaymentMethodPage.creditDebitCardSelectedTile).not.toBeVisible();
    });

    test('user cannot proceed from card details without required fields', async ({
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexCardDetailsPage,
      simplexBillingAddressPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await simplexHomePage.clickBuyCryptoButton();

      await simplexBuyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();
      await simplexPaymentMethodPage.clickContinue();

      await simplexCardDetailsPage.clickNext();

      const cardValidations = simplexCardDetailsPage.cardCollectionRequiredValidations;
      await expect(cardValidations).toHaveCount(4);
      for (let i = 0; i < 4; i++) {
        await expect(cardValidations.nth(i)).toBeVisible();
      }
      await expect(simplexCardDetailsPage.termsRequiredValidation).toBeVisible();
      await expect(simplexBillingAddressPage.countrySelection).not.toBeVisible();
    });

    test('user cannot proceed from billing address without required fields', async ({
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexCardDetailsPage,
      simplexBillingAddressPage,
      simplexPersonalDetailsPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await simplexHomePage.clickBuyCryptoButton();

      await simplexBuyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();
      await simplexPaymentMethodPage.clickContinue();

      await simplexCardDetailsPage.fillCardDetails(card, { acceptTerms: true });
      await simplexCardDetailsPage.clickNext();

      await expect(simplexBillingAddressPage.countrySelection).toBeVisible();
      await simplexBillingAddressPage.clickNext();

      const billingValidations = simplexBillingAddressPage.requiredValidations;
      await expect(billingValidations).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        await expect(billingValidations.nth(i)).toBeVisible();
      }
      await expect(simplexPersonalDetailsPage.firstMiddleNameInput).not.toBeVisible();
    });

    test('user cannot proceed from personal details without required fields', async ({
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexCardDetailsPage,
      simplexBillingAddressPage,
      simplexPersonalDetailsPage,
      simplexVerificationPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await simplexHomePage.clickBuyCryptoButton();

      await simplexBuyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();
      await simplexPaymentMethodPage.clickContinue();

      await simplexCardDetailsPage.fillCardDetails(card, { acceptTerms: true });
      await simplexCardDetailsPage.clickNext();

      await simplexBillingAddressPage.fillBillingAddress(billingAddress);

      await expect(simplexPersonalDetailsPage.firstMiddleNameInput).toBeVisible();
      await simplexPersonalDetailsPage.clickPayNow();

      const personalValidations = simplexPersonalDetailsPage.requiredValidations;
      await expect(personalValidations).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        await expect(personalValidations.nth(i)).toBeVisible();
      }
      await expect(simplexVerificationPage.otpInputContainer).not.toBeVisible();
    });
  });

  test.describe('Euro Bank Transfer', () => {
    test('user enters wrong OTP code and sees error', async ({
      page,
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexEmailAddressPage,
      simplexVerificationPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await expect(page).toHaveTitle(/simplex/i);

      await simplexHomePage.clickBuyCryptoButton();
      await simplexBuyCryptoPage.fillAmountAndAddress('500', bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();

      await simplexPaymentMethodPage.selectEuroBankTransfer();
      await simplexPaymentMethodPage.clickContinue();

      await simplexEmailAddressPage.fillEmailAndAcceptTerms(personalDetails.email, { acceptTerms: true });
      await simplexEmailAddressPage.clickNext();

      await expect(simplexVerificationPage.otpInputContainer).toBeVisible();
      await expect(simplexVerificationPage.verifyButton).toBeVisible();
      await simplexVerificationPage.enterVerificationCode('0000');
      await simplexVerificationPage.clickVerify();

      await expect(simplexVerificationPage.invalidCodeMessage).toBeVisible();
    });
  });

  test.describe('Crypto selection and language', () => {
    test('user selects ADA with PLN and proceeds to payment method', async ({
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      cookieBanner,
    }) => {
      await simplexHomePage.goto();
      await simplexHomePage.clickBuyCryptoButton();

      await simplexBuyCryptoPage.selectCrypto('ADA');
      await simplexBuyCryptoPage.selectFiat('PLN');
      await simplexBuyCryptoPage.fillAmountAndAddress('1000', adaAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();

      await expect(simplexPaymentMethodPage.creditDebitCardSelectedTile).toBeVisible();
    });

    test('user changes language to Español', async ({
      page,
      simplexHomePage,
      simplexBuyCryptoPage,
      simplexPaymentMethodPage,
      simplexCardDetailsPage,
      cookieBanner,
      languageSelector,
    }) => {
      await simplexHomePage.goto();
      await expect(page).toHaveTitle(/simplex/i);

      await simplexHomePage.clickBuyCryptoButton();
      await simplexBuyCryptoPage.fillAmountAndAddress('777', bitcoinAddress);
      await simplexBuyCryptoPage.clickContinue();
      await cookieBanner.acceptAll();

      await simplexPaymentMethodPage.clickContinue();

      await expect(simplexCardDetailsPage.cardNumberInput).toBeVisible();

      await languageSelector.selectLanguage(LANGUAGES.ESPANOL);

      const { header, nextButton, cardNumberLabel } = cardDetailsLocalized.es;
      await expect(simplexCardDetailsPage.getHeaderHeading(header)).toBeVisible();
      await expect(simplexCardDetailsPage.getSubmitButton(nextButton)).toBeVisible();
      await expect(simplexCardDetailsPage.getCardNumberLabel(cardNumberLabel)).toBeVisible();
    });
  });
});
