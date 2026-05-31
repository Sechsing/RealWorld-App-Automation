import { test, expect } from '@playwright/test';
import { AuthenticatedHomePage } from '../src/pages/AuthenticatedHomePage';

test.describe('Authenticated Home Page', () => {
    let authenticatedHomePage: AuthenticatedHomePage;

    test.beforeEach(async ({ page }) => {
        authenticatedHomePage = new AuthenticatedHomePage(page);
        await authenticatedHomePage.goto();
    });

    test('should display new article link and navigate to the create new article page', async ({ page }) => {
        await expect(authenticatedHomePage.newArticleLink).toBeVisible();
        await authenticatedHomePage.newArticleLink.click();
        
        await expect(page).toHaveURL('/editor');
    });

    test('should display settings link and navigate to the settings page', async ({ page }) => {
        await expect(authenticatedHomePage.settingsLink).toBeVisible();
        await authenticatedHomePage.settingsLink.click();

        await expect(page).toHaveURL('/settings');
    });
});
