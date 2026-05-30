import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly title: Locator;
  readonly logo: Locator;
  readonly conduitLink: Locator;
  readonly homeLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;
  readonly globalFeedTab: Locator;
  readonly articleCards: Locator;
  readonly popularTagsHeading: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Brand & Navigation Locators
    this.title = page.getByRole('heading', { name: 'Conduit' });
    this.logo = page.getByRole('navigation').getByRole('img', { name: /conduit/i });
    this.conduitLink = page.locator('app-layout-header').getByRole('link', { name: 'Conduit' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.footer = page.getByRole('contentinfo');
    
    // Main Content Layout Locators
    this.globalFeedTab = page.getByRole('link', { name: 'Global Feed' });
    this.popularTagsHeading = page.getByText('Popular Tags');
    this.articleCards = page.locator('app-article-list').locator('app-article-preview');
  }

  /**
   * Navigates to the application's base URL
   */
  async goto() {
    await this.page.goto('');
  }
}