import { test, expect } from '@playwright/test';
import { NewArticlePage } from '../src/pages/NewArticlePage';
import { testFooter, testHeader } from './shared/layout';

test.describe('New Article Page', () => {
    let newArticlePage: NewArticlePage;

    test.beforeEach(async ({ page }) => {
        newArticlePage = new NewArticlePage(page);
        await newArticlePage.goto();
    });

    testHeader(() => newArticlePage);
    testFooter(() => newArticlePage);

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
});