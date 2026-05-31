import path from 'path';
import { test as setup, expect } from '@playwright/test';

const storageState = path.resolve(process.cwd(), '.auth/user.json');
const email = process.env.REALWORLD_EMAIL;
const password = process.env.REALWORLD_PASSWORD;

if (!email || !password) {
    throw new Error(
        'Please set REALWORLD_EMAIL and REALWORLD_PASSWORD before running Playwright tests.'
    );
}

setup('create authenticated storage state via API', async ({ request }) => {
    const response = await request.post('https://api.realworld.show/api/users/login', {
        data: {
            user: {
                email: email,       
                password: password  
            }
        }
    });

    if (!response.ok()) {
        const errorBody = await response.text();
        console.error('Login failed. Status:', response.status(), 'Body:', errorBody);
    }
    expect(response.ok()).toBeTruthy();
    
    await request.storageState({ path: storageState });
});