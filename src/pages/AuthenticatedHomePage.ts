import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class AuthenticatedHomePage extends HomePage {
    readonly userProfileLink: Locator;

    constructor(page: Page) {
        super(page);

        this.userProfileLink = page.getByRole('link', { name: /profile/i });
    }
}