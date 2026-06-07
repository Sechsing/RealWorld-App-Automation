import { test, expect } from '@playwright/test';
import { NewArticlePage } from '../src/pages/NewArticlePage';

test.describe('New Article Page', () => {
    let newArticlePage: NewArticlePage;

    test.beforeEach(async ({ page }) => {
        newArticlePage = new NewArticlePage(page);
        await newArticlePage.goto();
    });

    test('should display logo in nav bar and navigate to home page', async () => {
        await expect(newArticlePage.logo).toBeVisible();
        await newArticlePage.logo.click();

        await expect(newArticlePage.page).toHaveURL('/');
    });

    test('should have the home link and navigate to home page', async ({ page}) => {
        await expect(newArticlePage.homeLink).toBeVisible();
        await newArticlePage.homeLink.click();

        await expect(page).toHaveURL('/');
    });

    test('should have new article link and navigate to new article page', async ({ page }) => {
        await expect(newArticlePage.newArticleLink).toBeVisible();
        await newArticlePage.newArticleLink.click();

        await expect(page).toHaveURL('/editor');
    });

    test('should have settings link and navigate to settings page', async ({ page }) => {
        await expect(newArticlePage.settingsLink).toBeVisible();
        await newArticlePage.settingsLink.click();

        await expect(page).toHaveURL('/settings');
    });

    test('should have user profile link and navigate to user profile page', async ({ page }) => {
        await expect(newArticlePage.userProfileLink).toBeVisible();
        await newArticlePage.userProfileLink.click();

        const userEmail = process.env.REALWORLD_EMAIL;
        if (!userEmail) throw new Error('REALWORLD_EMAIL env variable is missing');

        await expect(page).toHaveURL(new RegExp(`/profile/${userEmail}`, 'i'));
    });

    test('should be able to fill out the article title', async () => {
        await expect(newArticlePage.titleField).toBeEditable();
        await expect(newArticlePage.titleField).toHaveValue('');

        const articleTitle = 'Test Article Title';
        await newArticlePage.titleField.fill(articleTitle);
        await expect(newArticlePage.titleField).toHaveValue(articleTitle);
    });

    test('should be able to fill out the article description', async () => {
        await expect(newArticlePage.descriptionField).toBeEditable();
        await expect(newArticlePage.descriptionField).toHaveValue('');  

        const articleDescription = 'Test Article Description';
        await newArticlePage.descriptionField.fill(articleDescription);
        await expect(newArticlePage.descriptionField).toHaveValue(articleDescription);
    });

    test('should be able to fill out the article body', async () => {
        await expect(newArticlePage.bodyField).toBeEditable();
        await expect(newArticlePage.bodyField).toHaveValue('');

        const articleBody = 'Test Article Body';
        await newArticlePage.bodyField.fill(articleBody);
        await expect(newArticlePage.bodyField).toHaveValue(articleBody);
    });

    test('should be able to fill out the article tags', async () => {
        await expect(newArticlePage.tagsField).toBeEditable();
        await expect(newArticlePage.tagsField).toHaveValue('');

        const articleTags = 'Test Article Tags';
        await newArticlePage.tagsField.fill(articleTags);
        await expect(newArticlePage.tagsField).toHaveValue(articleTags);    
    });

    test('should have publish button enabled', async () => {
        await expect(newArticlePage.publishButton).toBeEnabled();
        await newArticlePage.publishButton.click();
    });

    test('should display logo in footer and navigate to home page', async ({ page }) => {
        await expect(newArticlePage.footer.getByRole('link', { name: 'Conduit' })).toBeVisible();
        await newArticlePage.footer.getByRole('link', { name: /conduit/i }).click();

        await expect(page).toHaveURL('/');
    });

    test('should display the footer copyright notice', async () => {
        await expect(newArticlePage.footer.getByText(/An interactive learning project/i)).toBeVisible();  
    });

    test('should navigate to Github repository', async ({ page }) => {
        await newArticlePage.footer.getByRole('link', { name: 'RealWorld OSS Project' }).click();

        await expect(page).toHaveURL('https://github.com/realworld-apps/realworld');
    });
});