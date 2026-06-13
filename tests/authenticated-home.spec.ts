import { test, expect } from '@playwright/test';
import { AuthenticatedHomePage } from '../src/pages/AuthenticatedHomePage';
import { testFooter, testHeader } from './shared/layout';

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
