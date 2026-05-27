import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test('home page should load', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/Conduit/);
});