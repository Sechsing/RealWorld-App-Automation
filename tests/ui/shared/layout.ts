import { expect, test } from '@playwright/test';

interface HasHeader {
    page: any;
    header: { logo: any, homeLink: any, newArticleLink: any, settingsLink: any, userProfileLink: any };
}

interface HasFooter {
    page: any;
    footer: { logo: any, homeLink: any, copyrightText: any, githubLink: any };
}

export function testHeader(getPageInstance: () => HasHeader) {
    test.describe('Shared header component', () => {
        test('should display logo in header and navigate to home page', async () => {
            const instance = getPageInstance();

            await expect(instance.header.logo).toBeVisible();
            await instance.header.logo.click();

            await expect(instance.page).toHaveURL('/');
        });

        test('should have the home link and navigate to home page', async () => {
            const instance = getPageInstance();

            await expect(instance.header.homeLink).toBeVisible();
            await instance.header.homeLink.click();
            
            await expect(instance.page).toHaveURL('/');
        });

        test('should have new article link and navigate to new article page', async ({ page }) => {
            const instance = getPageInstance();

            await expect(instance.header.newArticleLink).toBeVisible();
            await instance.header.newArticleLink.click();

            await expect(page).toHaveURL('/editor');
        });

        test('should have settings link and navigate to settings page', async ({ page }) => {
            const instance = getPageInstance();
            
            await expect(instance.header.settingsLink).toBeVisible();
            await instance.header.settingsLink.click();

            await expect(page).toHaveURL('/settings');
        });

        test('should have user profile link and navigate to user profile page', async ({ page }) => {
            const instance = getPageInstance();
            
            await expect(instance.header.userProfileLink).toBeVisible();
            await instance.header.userProfileLink.click();

            const userEmail = process.env.REALWORLD_EMAIL;
            if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

            await expect(page).toHaveURL(new RegExp(`/profile/${userEmail}`, 'i'));
        });
    });
}

export function testFooter(getPageInstance: () => HasFooter) {
    test.describe('Shared footer component', () => {
        test('should display logo in footer and navigate to home page', async ({ page }) => {
            const instance = getPageInstance();

            await expect(instance.footer.logo).toBeVisible();
            await instance.footer.homeLink.click();

            await expect(page).toHaveURL('/');
        });

        test('should display the footer copyright notice', async () => {
            const instance = getPageInstance();
            await expect(instance.footer.copyrightText).toBeVisible();  
        });

        test('should navigate to Github repository', async ({ page }) => {
            const instance = getPageInstance();
            await instance.footer.githubLink.click();

            await expect(page).toHaveURL('https://github.com/realworld-apps/realworld');
        });
    });
}