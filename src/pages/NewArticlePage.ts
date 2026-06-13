import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export class NewArticlePage {
    readonly page: Page;
    readonly header: Header;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly bodyField: Locator;
    readonly tagsField: Locator;
    readonly publishButton: Locator;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;

        // Header and Footer Element Locators
        this.header = new Header(page);
        this.footer = new Footer(page);

        // Main Content Locators
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