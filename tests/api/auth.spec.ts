import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const API_BASE_URL = process.env.REALWORLD_API_URL ?? 'https://api.realworld.show/api';

type UserCredentials = {
    username: string;
    email: string;
    password: string;
};

function createUniqueUser(): UserCredentials {
    return {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 'TestPass123',
    };
}

test.describe('Registration API', () => {
    test('should register a new user', async ({ request }) => {
        const user = createUniqueUser();

        const response = await request.post(`${API_BASE_URL}/users`, {
            data: { user },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.user).toMatchObject({
            email: user.email,
            username: user.username,
        });
        expect(body.user.token).toBeTruthy();
    });

    test('should return the same user when registering with existing credentials', async ({ request }) => {
        const user = createUniqueUser();

        const firstResponse = await request.post(`${API_BASE_URL}/users`, { data: { user } });
        expect(firstResponse.status()).toBe(201);

        const secondResponse = await request.post(`${API_BASE_URL}/users`, { data: { user } });
        expect(secondResponse.status()).toBe(201);

        const secondBody = await secondResponse.json();
        expect(secondBody.user).toMatchObject({
            email: user.email,
            username: user.username,
        });
        expect(secondBody.user.token).toBeTruthy();
    });

    test('should reject registration with missing fields', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/users`, {
            data: { user: { email: 'incomplete@example.com' } },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body.errors).toBeDefined();
    });
});

test.describe('Login API', () => {
    test('should login with valid credentials', async ({ request }) => {
        const user = createUniqueUser();

        const registerResponse = await request.post(`${API_BASE_URL}/users`, {
            data: { user },
        });
        expect(registerResponse.status()).toBe(201);

        const response = await request.post(`${API_BASE_URL}/users/login`, {
            data: {
                user: {
                    email: user.email,
                    password: user.password,
                },
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.user).toMatchObject({
            email: user.email,
            username: user.username,
        });
        expect(body.user.token).toBeTruthy();
    });

    test('should reject login with invalid credentials', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/users/login`, {
            data: {
                user: {
                    email: 'nonexistent@example.com',
                    password: 'wrongpassword',
                },
            },
        });

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body.errors).toBeDefined();
    });

    test('should reject login with missing fields', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}/users/login`, {
            data: { user: { email: 'missing-password@example.com' } },
        });

        expect(response.status()).toBe(422);

        const body = await response.json();
        expect(body.errors).toBeDefined();
    });

    test('should fetch current user with login token', async ({ request }) => {
        const user = createUniqueUser();

        await request.post(`${API_BASE_URL}/users`, { data: { user } });

        const loginResponse = await request.post(`${API_BASE_URL}/users/login`, {
            data: {
                user: {
                    email: user.email,
                    password: user.password,
                },
            },
        });
        expect(loginResponse.status()).toBe(200);

        const { user: loggedInUser } = await loginResponse.json();

        const response = await request.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: `Token ${loggedInUser.token}`,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.user).toMatchObject({
            email: user.email,
            username: user.username,
        });
    });
});
