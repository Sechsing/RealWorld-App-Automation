import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class AuthenticatedHomePage extends HomePage {
    readonly userProfileLink: Locator;
    readonly yourFeedTab: Locator;

    constructor(page: Page) {
        super(page);

        const userEmail = process.env.REALWORLD_EMAIL || "";

        this.userProfileLink = page.getByRole('link', { name: new RegExp(userEmail, 'i') });
        this.yourFeedTab = page.getByRole('link', { name: /your feed/i });
    }
}