import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export class ProfilePage {
    readonly page: Page;
    readonly header: Header;
    readonly profilePicture: Locator;
    readonly username: Locator;
    readonly editProfileButton: Locator;
    readonly myPostsTab: Locator;
    readonly favoritedPostsTab: Locator;
    readonly articleCards: Locator;
    readonly footer: Footer;
    readonly userEmail: string;

    constructor(page: Page) {
        this.page = page;
        this.userEmail = process.env.REALWORLD_EMAIL || "";

        // Header and Footer Element Locators
        this.header = new Header(page);
        this.footer = new Footer(page);

        // Main Content Locators
        this.profilePicture = page.locator('.user-info').getByRole('img');
        this.username = page.getByRole('heading', { name: `${this.userEmail}` });
        this.editProfileButton = page.getByRole('link', { name: /Edit Profile Settings/i });
        this.myPostsTab = page.getByRole('link', { name: /my posts/i });
        this.favoritedPostsTab = page.getByRole('link', { name: /favorited posts/i });
        this.articleCards = page.locator('app-profile').locator('app-article-preview');
    }

    async goto() {
        await this.page.goto(`/profile/${this.userEmail}`);
    }   
}
    
