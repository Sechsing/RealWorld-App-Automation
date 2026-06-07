import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Home Page', () => {
    let homePage: HomePage;

    // Ignore the global logged-in storage state
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('should display the page title', async () => {
        await expect(homePage.title).toBeVisible();
    });

    test('should display logo in nav bar and navigate to home page', async () => {
        await expect(homePage.logo).toBeVisible();
        await homePage.logo.click();

        await expect(homePage.page).toHaveURL('/');
    });

    test('should have the home link and navigate to home page', async ({ page}) => {
        await expect(homePage.homeLink).toBeVisible();
        await homePage.homeLink.click();

        await expect(page).toHaveURL('/');
    });

    test('should not have new article link visible for unauthenticated users', async () => {
        await expect(homePage.newArticleLink).not.toBeVisible();
    });

    test('should not have settings link visible for unauthenticated users', async () => {
        await expect(homePage.settingsLink).not.toBeVisible();
    });

    test('should have sign in and sign up buttons', async () => {
        await expect(homePage.signInLink).toBeVisible();
        await expect(homePage.signUpLink).toBeVisible();
    });

    test('should navigate to sign in page', async ({ page }) => {
        await homePage.signInLink.click();

        await expect(page).toHaveURL('/login');
    });

    test('should navigate to sign up page', async ({ page }) => {
        await homePage.signUpLink.click();

        await expect(page).toHaveURL('/register');
    });

    test('should display the global feed', async () => {
        await expect(homePage.globalFeedTab).toBeVisible();
        await expect(homePage.globalFeedTab).toHaveText('Global Feed');
    });

    test('should have more than zero articles', async () => {
        await expect(homePage.articleCards).not.toHaveCount(0);
    });

    test('should display the tags', async () => {
        await expect(homePage.popularTagsHeading).toBeVisible();
        await expect(homePage.popularTagsHeading).toHaveText('Popular Tags');
    });

    test('should display logo in footer and navigate to home page', async ({ page }) => {
        await expect(homePage.footer.getByRole('link', { name: 'Conduit' })).toBeVisible();
        await homePage.footer.getByRole('link', { name: /conduit/i }).click();

        await expect(page).toHaveURL('/');
    });

    test('should display the footer copyright notice', async () => {
        await expect(homePage.footer.getByText(/An interactive learning project/i)).toBeVisible();  
    });

    test('should navigate to Github repository', async ({ page }) => {
        await homePage.footer.getByRole('link', { name: 'RealWorld OSS Project' }).click();

        await expect(page).toHaveURL('https://github.com/realworld-apps/realworld');
    });
});