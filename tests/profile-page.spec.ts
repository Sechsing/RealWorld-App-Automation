import { expect, test } from '@playwright/test';
import { ProfilePage } from '../src/pages/ProfilePage';
import { testHeader, testFooter } from './shared/layout';

test.describe('Profile Page Tests', () => {
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        profilePage = new ProfilePage(page);
        await profilePage.goto();
    });

    testHeader(() => profilePage);
    testFooter(() => profilePage);

    test('should display user profile picture and username', async () => {
        await expect(profilePage.profilePicture).toBeVisible();
        await expect(profilePage.username).toBeVisible();
    });

    test('should have edit profile settings button enabled', async () => {
        await expect(profilePage.editProfileButton).toBeVisible();
        await profilePage.editProfileButton.click();
    });

        test('should display the my posts tab and navigate to the my posts page', async ({ page }) => {
        await expect(profilePage.myPostsTab).toBeVisible();
        await profilePage.myPostsTab.click();

        await expect(page).toHaveURL(`/profile/${profilePage.userEmail}`);
    });

    test('should display the favorited posts tab and navigate to the favorited posts page', async ({ page }) => {
        await expect(profilePage.favoritedPostsTab).toBeVisible();
        await profilePage.favoritedPostsTab.click();

        await expect(page).toHaveURL(`/profile/${profilePage.userEmail}/favorites`);
    });
});


    