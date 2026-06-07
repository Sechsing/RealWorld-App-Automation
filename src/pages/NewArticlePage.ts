import { Page, Locator } from '@playwright/test';

export class NewArticlePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly settingsLink: Locator;
    readonly newArticleLink: Locator;
    readonly userProfileLink: Locator;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly bodyField: Locator;
    readonly tagsField: Locator;
    readonly publishButton: Locator;
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
        this.titleField = page.getByPlaceholder(/Article Title/i);
        this.descriptionField = page.getByPlaceholder(/What's this article about\?/i);
        this.bodyField = page.getByPlaceholder(/Write your article \(in markdown\)/i);
        this.tagsField = page.getByPlaceholder(/Enter tags/i);
        this.publishButton = page.getByRole('button', { name: /publish article/i });
    }   

    /**
     * Navigates to the application's new article page URL
     */
    async goto() {
        await this.page.goto('/editor');
    }
}