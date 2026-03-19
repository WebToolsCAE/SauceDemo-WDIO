const LoginPage = require('../pageobjects/login.page');
const logger = require('../utils/logger');

describe('UC-1: Form Validation - Login Page', () => {
  describe('Given the user is on the login page', () => {
    beforeEach(async () => {
      await LoginPage.open();
    });

    describe('When the user submits with empty Username and Password', () => {
      it('Then the error "Username is required" is displayed', async () => {
        logger.info('--- Test: empty username and password ---');
        await LoginPage.login('', '');
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(await LoginPage.errorMessage.getText()).toContain('Username is required');
        logger.info('Verified: "Username is required" error displayed');
      });
    });

    describe('When the user submits with Username only (no Password)', () => {
      it('Then the error "Password is required" is displayed', async () => {
        logger.info('--- Test: username only, no password ---');
        await LoginPage.login('standard_user', '');
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(await LoginPage.errorMessage.getText()).toContain('Password is required');
        logger.info('Verified: "Password is required" error displayed');
      });
    });
  });

  describe('UC-2: Handling Latency - performance_glitch_user', () => {
    describe('Given the user is on the login page', () => {
      it('When logging in as performance_glitch_user, Then the inventory page loads without hard-coded waits', async () => {
        logger.info('--- Test: performance_glitch_user login latency ---');
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        await expect($('#inventory_container')).toBeExisting();
        logger.info('Verified: inventory page loaded despite delay');
      });
    });
  });
});