import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly newArticleLink: Locator;
    readonly settingsLink: Locator;
    readonly userProfileLink: Locator;

    constructor(page: Page) {
        this.page = page;
        const userEmail = process.env.REALWORLD_EMAIL || "";

        this.logo = page.getByRole('navigation').getByRole('img', { name: /conduit/i });
        this.homeLink = page.getByRole('navigation').getByRole('link', { name: /home/i });
        this.newArticleLink = page.getByRole('navigation').getByRole('link', { name: /new article/i });
        this.settingsLink = page.getByRole('navigation').getByRole('link', { name: /settings/i });
        this.userProfileLink = page.getByRole('navigation').getByRole('link', { name: `${userEmail}` });
    }
}