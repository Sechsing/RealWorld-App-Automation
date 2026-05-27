import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly navBar: Locator;
  readonly newArticleButton: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = page.locator('nav');
    this.newArticleButton = page.getByRole('link', { name: /new article/i });
    this.signInLink = page.getByRole('link', { name: /sign in/i });
  }

  async goto() {
    await this.page.goto('');
  }

  async clickNewArticle() {
    await this.newArticleButton.click();
  }
}