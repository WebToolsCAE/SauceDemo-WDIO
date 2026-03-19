const LoginPage = require('../pageobjects/login.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const logger = require('../utils/logger');

describe('UC-1: Form Validation - Checkout Page', () => {
  describe('Given the user is logged in and on the checkout information page', () => {
    it('When the user submits without filling the postal code, Then an error message is displayed', async () => {
      logger.info('--- Test: checkout without postal code ---');
      // Given
      await LoginPage.open();
      await LoginPage.login('standard_user', 'secret_sauce');
      await CheckoutPage.toCart();
      await CheckoutPage.clickCheckout();
      await CheckoutPage.firstNameInput.setValue('John');
      await CheckoutPage.lastNameInput.setValue('Doe');
      // When - postal code left empty
      await CheckoutPage.clickContinue();
      // Then
      await expect(CheckoutPage.errorMessage).toBeExisting();
      await expect(await CheckoutPage.errorMessage.getText()).toContain('Postal Code');
      logger.info('Verified: postal code error message displayed');
    });
  });
});
