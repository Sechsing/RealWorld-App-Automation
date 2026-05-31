import path from 'path';
import { test as setup, expect } from '@playwright/test';

const storageState = path.resolve(process.cwd(), '.auth/user.json');
const email = process.env.REALWORLD_EMAIL;
const password = process.env.REALWORLD_PASSWORD;

if (!email || !password) {
    throw new Error('Please set REALWORLD_EMAIL and REALWORLD_PASSWORD variables.');
}

setup('create authenticated storage state via UI', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('textbox', { name: /email/i }).fill(email);
    await page.getByRole('textbox', { name: /password/i }).fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait until the UI updates and reflects a signed-in profile
    await expect(page.getByRole('link', { name: /sign in/i })).not.toBeVisible();
    
    // Save the authentic session state map to disk
    await page.context().storageState({ path: storageState });
});