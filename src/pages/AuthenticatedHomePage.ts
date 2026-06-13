import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export class AuthenticatedHomePage {
    readonly page: Page;
    readonly header: Header;
    readonly signInLink: Locator;
    readonly signUpLink: Locator;
    readonly yourFeedTab: Locator;
    readonly globalFeedTab: Locator;
    readonly articleCards: Locator;
    readonly popularTagsHeading: Locator;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;

        // Header and Footer Element Locators
        this.header = new Header(page);
        this.signInLink = page.getByRole('link', { name: /sign in/i });
        this.signUpLink = page.getByRole('link', { name: /sign up/i });
        this.footer = new Footer(page);

        // Main Content Locators
        this.yourFeedTab = page.getByRole('link', { name: /your feed/i });
        this.globalFeedTab = page.getByRole('link', { name: /global Feed/i });
        this.popularTagsHeading = page.getByText(/popular tags/i);
        this.articleCards = page.locator('app-article-list').locator('app-article-preview');
    }
    
    async goto() {
        await this.page.goto('/');
    }
}