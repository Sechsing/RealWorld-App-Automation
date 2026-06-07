import { test, expect } from '@playwright/test';
import { AuthenticatedHomePage } from '../src/pages/AuthenticatedHomePage';

test.describe('Authenticated Home Page', () => {
    let authenticatedHomePage: AuthenticatedHomePage;

    test.beforeEach(async ({ page }) => {
        authenticatedHomePage = new AuthenticatedHomePage(page);
        await authenticatedHomePage.goto();
    });

    test('should not display sign in and sign up buttons', async () => {
        await expect(authenticatedHomePage.signInLink).not.toBeVisible();
        await expect(authenticatedHomePage.signUpLink).not.toBeVisible();
    });

    test('should display logo in nav bar and navigate to home page', async ({ page }) => {
        await expect(authenticatedHomePage.logo).toBeVisible();
        await authenticatedHomePage.logo.click();

        await expect(page).toHaveURL('/');
    });

     test('should have the home link and navigate to home page', async ({ page}) => {
        await expect(authenticatedHomePage.homeLink).toBeVisible();
        await authenticatedHomePage.homeLink.click();

        await expect(page).toHaveURL('/');
    });

    test('should display new article link and navigate to the new article page', async ({ page }) => {
        await expect(authenticatedHomePage.newArticleLink).toBeVisible();
        await authenticatedHomePage.newArticleLink.click();
        
        await expect(page).toHaveURL('/editor');
    });

    test('should display settings link and navigate to the settings page', async ({ page }) => {
        await expect(authenticatedHomePage.settingsLink).toBeVisible();
        await authenticatedHomePage.settingsLink.click();

        await expect(page).toHaveURL('/settings');
    });

    test('should display user profile link and navigate to the user profile page', async ({ page }) => {
        await expect(authenticatedHomePage.userProfileLink).toBeVisible();
        await authenticatedHomePage.userProfileLink.click();

        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(page).toHaveURL(new RegExp(`/profile/${userEmail}`, 'i'));
    });

    test('should display the your feed tab and navigate to the your feed page', async ({ page }) => {
        await expect(authenticatedHomePage.yourFeedTab).toBeVisible();
        await authenticatedHomePage.yourFeedTab.click();

        await expect(page).toHaveURL('/?feed=following');
    });

    test('should display the global feed tab and navigate to the global feed page', async ({ page }) => {
        await expect(authenticatedHomePage.globalFeedTab).toBeVisible();
        await authenticatedHomePage.globalFeedTab.click();

        await expect(page).toHaveURL('/');
    });

        test('should display the tags', async () => {
        await expect(authenticatedHomePage.popularTagsHeading).toBeVisible();
        await expect(authenticatedHomePage.popularTagsHeading).toHaveText('Popular Tags');
    });

    test('should display logo in footer and navigate to home page', async ({ page }) => {
        await expect(authenticatedHomePage.footer.getByRole('link', { name: 'Conduit' })).toBeVisible();
        await authenticatedHomePage.footer.getByRole('link', { name: 'Conduit' }).click();

        await expect(page).toHaveURL('/');
    });

    test('should display the footer copyright notice', async () => {
        await expect(authenticatedHomePage.footer.getByText(/An interactive learning project/i)).toBeVisible();  
    });

    test('should navigate to Github repository', async ({ page }) => {
        await authenticatedHomePage.footer.getByRole('link', { name: 'RealWorld OSS Project' }).click();

        await expect(page).toHaveURL('https://github.com/realworld-apps/realworld');
    });
});
