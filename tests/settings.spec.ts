import { test, expect } from '@playwright/test';
import { SettingsPage } from '../src/pages/SettingsPage';
import { testHeader, testFooter } from './shared/layout';

test.describe('Settings Page', () => {
    let settingsPage: SettingsPage;

    test.beforeEach(async ({ page }) => {
        settingsPage = new SettingsPage(page);
        await settingsPage.goto();
    });

    testHeader(() => settingsPage);
    testFooter(() => settingsPage);

    test('should display the settings page title', async () => {
        await expect(settingsPage.title).toBeVisible();
        await expect(settingsPage.title).toHaveText(/settings/i);
    });

    test('should be able to fill out the profile picture URL', async () => {
        await expect(settingsPage.profilePictureUrlField).toBeEditable();
        await expect(settingsPage.profilePictureUrlField).toHaveValue('');

        const profilePictureUrl = 'https://example.com/profile-picture.jpg';

        await settingsPage.profilePictureUrlField.fill(profilePictureUrl);
        await expect(settingsPage.profilePictureUrlField).toHaveValue(profilePictureUrl);
    });

    test('should be able to fill out the username', async () => {
        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(settingsPage.usernameField).toBeEditable();
        await expect(settingsPage.usernameField).toHaveValue(`${userEmail}`);

        const username = 'testuser';

        await settingsPage.usernameField.fill(username);
        await expect(settingsPage.usernameField).toHaveValue(username);
    });

    test('should be able to fill out the bio', async () => {
        await expect(settingsPage.bioField).toBeEditable();
        await expect(settingsPage.bioField).toHaveValue('');

        const bio = 'This is a test bio';

        await settingsPage.bioField.fill(bio);
        await expect(settingsPage.bioField).toHaveValue(bio);
    });

    test('should be able to fill out the email', async () => {
        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(settingsPage.emailField).toBeEditable();
        await expect(settingsPage.emailField).toHaveValue(`${userEmail}`);
        
        const email = 'testuser@example.com';

        await settingsPage.emailField.fill(email);
        await expect(settingsPage.emailField).toHaveValue(email);
    });

    test('should be able to fill out the password', async () => {
        await expect(settingsPage.passwordField).toBeEditable();
        await expect(settingsPage.passwordField).toHaveValue('');

        const password = 'newpassword123';

        await settingsPage.passwordField.fill(password);
        await expect(settingsPage.passwordField).toHaveValue(password);
    });

    test('should update profile and navigate to user profile page', async ({ page }) => {
        await expect(settingsPage.updateSettingsButton).toBeEnabled();
        await settingsPage.updateSettingsButton.click();
        
        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(page).toHaveURL(new RegExp(`/profile/${userEmail}`, 'i'));
    });

    test('should log out and navigate to home page', async ({ page }) => {
        await expect(settingsPage.logoutButton).toBeVisible();
        await settingsPage.logoutButton.click();

        await expect(page).toHaveURL('/');
    });
});
