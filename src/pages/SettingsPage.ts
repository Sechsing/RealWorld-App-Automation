import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export class SettingsPage {
    readonly page: Page;
    readonly header: Header;
    readonly title: Locator;
    readonly profilePictureUrlField: Locator;
    readonly usernameField: Locator;
    readonly bioField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly updateSettingsButton: Locator;
    readonly logoutButton: Locator;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;
        
        const userEmail = process.env.REALWORLD_EMAIL || "";

        // Header and Footer Element Locators
        this.header = new Header(page);
        this.footer = new Footer(page);

        // Main Content Locators
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