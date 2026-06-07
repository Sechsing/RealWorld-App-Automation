import { test, expect } from '@playwright/test';
import { SettingsPage } from '../src/pages/SettingsPage';

test.describe('Settings Page', () => {
    let settingsPage: SettingsPage;

    test.beforeEach(async ({ page }) => {
        settingsPage = new SettingsPage(page);
        await settingsPage.goto();
    });

    test('should display logo in nav bar and navigate to home page', async () => {
        await expect(settingsPage.logo).toBeVisible();
        await settingsPage.logo.click();

        await expect(settingsPage.page).toHaveURL('/');
    });

    test('should have the home link and navigate to home page', async ({ page}) => {
        await expect(settingsPage.homeLink).toBeVisible();
        await settingsPage.homeLink.click();

        await expect(page).toHaveURL('/');
    });

    test('should have new article link and navigate to new article page', async ({ page }) => {
        await expect(settingsPage.newArticleLink).toBeVisible();
        await settingsPage.newArticleLink.click();

        await expect(page).toHaveURL('/editor');
    });

    test('should have settings link and navigate to settings page', async ({ page }) => {
        await expect(settingsPage.settingsLink).toBeVisible();
        await settingsPage.settingsLink.click();

        await expect(page).toHaveURL('/settings');
    });

    test('should have user profile link and navigate to user profile page', async ({ page }) => {
        await expect(settingsPage.userProfileLink).toBeVisible();
        await settingsPage.userProfileLink.click();

        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(page).toHaveURL(new RegExp(`/profile/${userEmail}`, 'i'));
    });

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

    test('should display logo in footer and navigate to home page', async ({ page }) => {
        await expect(settingsPage.footer.getByRole('link', { name: 'Conduit' })).toBeVisible();
        await settingsPage.footer.getByRole('link', { name: /conduit/i }).click();

        await expect(page).toHaveURL('/');
    });

    test('should display the footer copyright notice', async () => {
        await expect(settingsPage.footer.getByText(/An interactive learning project/i)).toBeVisible();  
    });

    test('should navigate to Github repository', async ({ page }) => {
        await settingsPage.footer.getByRole('link', { name: 'RealWorld OSS Project' }).click();

        await expect(page).toHaveURL('https://github.com/realworld-apps/realworld');
    });
});
