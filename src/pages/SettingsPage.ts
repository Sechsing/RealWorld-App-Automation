import { Page, Locator } from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly settingsLink: Locator;
    readonly newArticleLink: Locator;
    readonly userProfileLink: Locator;
    readonly title: Locator;
    readonly profilePictureUrlField: Locator;
    readonly usernameField: Locator;
    readonly bioField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly updateSettingsButton: Locator;
    readonly logoutButton: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        const userEmail = process.env.REALWORLD_EMAIL || "";

        this.page = page;

        // Header and Footer Element Locators
        this.logo = page.getByRole('navigation').getByRole('img', { name: /conduit/i });
        this.homeLink = page.getByRole('link', { name: /home/i });
        this.settingsLink = page.getByRole('link', { name: /settings/i });
        this.newArticleLink = page.getByRole('link', { name: /new article/i });
        this.userProfileLink = page.getByRole('link', { name: new RegExp(userEmail, 'i') });
        this.footer = page.getByRole('contentinfo');

        // Main Content Layout Locators
        this.title = page.getByRole('heading', { name: /settings/i });
        this.profilePictureUrlField = page.getByRole('textbox', { name: /Url of Profile Picture/i });
        this.usernameField = page.getByRole('textbox', { name: /Username/i });
        this.bioField = page.getByRole('textbox', { name: /Short bio about you/i });
        this.emailField = page.getByRole('textbox', { name: /Email/i });
        this.passwordField = page.getByRole('textbox', { name: /New Password/i });
        this.updateSettingsButton = page.getByRole('button', { name: /update settings/i });
        this.logoutButton = page.getByRole('button', { name: /Or click here to logout\./i });
    }

    /**
     * Navigates to the application's settings page URL
     */
    async goto() {
        await this.page.goto('/settings');
    }
}