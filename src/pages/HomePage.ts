import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly title: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly newArticleLink: Locator;
  readonly settingsLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;
  readonly globalFeedTab: Locator;
  readonly articleCards: Locator;
  readonly popularTagsHeading: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Brand & Navigation Locators
    this.title = page.getByRole('heading', { name: /conduit/i });
    this.logo = page.getByRole('navigation').getByRole('img', { name: /conduit/i });
    this.homeLink = page.getByRole('link', { name: /home/i });
    this.newArticleLink = page.getByRole('link', { name: /new article/i });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.footer = page.getByRole('contentinfo');
    
    // Main Content Layout Locators
    this.globalFeedTab = page.getByRole('link', { name: /global Feed/i });
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