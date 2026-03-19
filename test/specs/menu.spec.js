const LoginPage = require('../pageobjects/login.page');
const MenuPage = require('../pageobjects/menu.page');
const logger = require('../utils/logger');

describe('UC-2: Handling Latency - App State and Logout', () => {
  describe('Given the user is logged in as performance_glitch_user', () => {
    before(async () => {
      logger.info('--- Suite Setup: login as performance_glitch_user ---');
      await LoginPage.open();
      await LoginPage.login('performance_glitch_user', 'secret_sauce');
      await expect($('#inventory_container')).toBeExisting();
      logger.info('Suite Setup complete: inventory page loaded');
    });

    describe('When the user resets app state via the burger menu', () => {
      it('Then the cart badge is removed', async () => {
        logger.info('--- Test: reset app state ---');
        await MenuPage.openMenu();
        await MenuPage.resetAppState();
        expect(await MenuPage.isCartEmpty()).toBe(true);
        await MenuPage.closeMenu();
        logger.info('Verified: app state reset, cart is empty');
      });
    });

    describe('When the user logs out via the burger menu', () => {
      it('Then the user is redirected to the login page', async () => {
        logger.info('--- Test: logout ---');
        await MenuPage.openMenu();
        await MenuPage.logout();
        expect(await MenuPage.isLoggedOut()).toBe(true);
        logger.info('Verified: user logged out successfully');
      });
    });
  });
});
