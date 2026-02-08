import { test, expect } from './fixtures/basic.fixture';
import { bitcoinAddress } from '../../src/ui/test-data';

test.describe('Navigation', () => {
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

    await expect(paymentMethodPage.creditDebitCardSelectedTile).toBeVisible();
    await expect(paymentMethodPage.euroBankTransferTile).toBeVisible();
  });
});
