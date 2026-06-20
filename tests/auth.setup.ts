import path from 'path';
import { test as setup, expect } from '@playwright/test';

const storageState = path.resolve(process.cwd(), '.auth/user.json');
const email = process.env.REALWORLD_EMAIL;
const password = process.env.REALWORLD_PASSWORD;

if (!email || !password) {
    throw new Error('Please set REALWORLD_EMAIL and REALWORLD_PASSWORD variables.');
}

setup('ensure static account is registered and authenticated globally once', async ({ page }) => {
    // Register username, email and password
    await page.goto('/register', { waitUntil: 'commit' });

    await page.getByRole('textbox', { name: /username/i }).fill(email);
    await page.getByRole('textbox', { name: /email/i }).fill(email);
    await page.getByRole('textbox', { name: /password/i }).fill(password);
    await page.getByRole('button', { name: /sign up/i }).click();

    // Wait for either the dashboard to load or an error to pop up
    const errorMessages = page.locator('.error-messages');
    const profileLink = page.getByRole('link', { name: email });

    await Promise.race([
        profileLink.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
        errorMessages.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
    ]);

    // Log in if the account already exists
    if (await errorMessages.isVisible()) {
        console.log(`Account '${email}' already exists. Proceeding to login fallback...`);
        
        await page.goto('/login');
        await page.getByRole('textbox', { name: /email/i }).fill(email);
        await page.getByRole('textbox', { name: /password/i }).fill(password);
        await page.getByRole('button', { name: /sign in/i }).click();
    }

    // Verify log in state
    await expect(page.getByRole('link', { name: /sign in/i })).not.toBeVisible();
    
    // Save the valid cookie session map to disk for all test windows to inherit!
    await page.context().storageState({ path: storageState });
});