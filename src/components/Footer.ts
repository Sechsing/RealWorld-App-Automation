import { Page, Locator } from '@playwright/test';

export class Footer {
    readonly page: Page
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly copyrightText: Locator;
    readonly githubLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('contentinfo').getByRole('img', { name: /conduit/i });
        this.homeLink = page.getByRole('contentinfo').getByRole('link', { name: /conduit/i });
        this.copyrightText = page.getByRole('contentinfo').getByText(/An interactive learning project/i);
        this.githubLink = page.getByRole('contentinfo').getByRole('link', { name: 'RealWorld OSS Project' });
    }
}