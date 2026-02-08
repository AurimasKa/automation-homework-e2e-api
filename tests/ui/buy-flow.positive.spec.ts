import { test, expect } from './fixtures/basic.fixture';
import {
  bitcoinAddress,
  adaAddress,
  cardDetailsLocalized,
} from '../../src/ui/test-data';
import { LANGUAGES } from '../../src/ui/components/LanguageSelector';

test.describe('Buy flow (positive)', () => {
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

    await languageSelector.selectLanguage(LANGUAGES.ESPANOL);

    const { header, nextButton, cardNumberLabel } = cardDetailsLocalized.es;
    await expect(cardDetailsPage.getHeaderHeading(header)).toBeVisible();
    await expect(cardDetailsPage.getSubmitButton(nextButton)).toBeVisible();
    await expect(cardDetailsPage.getCardNumberLabel(cardNumberLabel)).toBeVisible();
  });
});
