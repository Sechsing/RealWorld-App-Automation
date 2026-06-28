import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthenticatedHomePage } from '../../src/pages/AuthenticatedHomePage';
import { testFooter, testHeader } from './shared/layout';

test.describe('Home Page', () => {
    let homePage: HomePage;

    // Ignore the global logged-in storage state
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    testFooter(() => homePage);

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
});

test.describe('Authenticated Home Page', () => {
    let authenticatedHomePage: AuthenticatedHomePage;

    test.beforeEach(async ({ page }) => {
        authenticatedHomePage = new AuthenticatedHomePage(page);
        await authenticatedHomePage.goto();
    });

    testHeader(() => authenticatedHomePage);
    testFooter(() => authenticatedHomePage);
    
    test('should not display sign in and sign up buttons', async () => {
        await expect(authenticatedHomePage.signInLink).not.toBeVisible();
        await expect(authenticatedHomePage.signUpLink).not.toBeVisible();
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
});
