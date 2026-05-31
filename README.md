# RealWorld-App-Automation

An E2E test automation framework built to validate the **Conduit RealWorld App** (Medium.com clone) using **Playwright**, **TypeScript**, and software engineering practices.

---

## 🏗️ Framework Architecture Highlights

*   **Global Authentication Setup (`storageState`):** Bypasses repetitive UI login forms. A background setup project handles authentication once via a fast API `POST` request, saving the browser context globally to slash overall suite execution time.
*   **Decoupled Page Object Model (POM):** Enforces a clean separation between page structural elements (locators/interactions) and the actual assertion test scripts.
*   **Custom Test Fixtures:** Extends Playwright's core test engine to automatically inject page objects. This eliminates messy object instantiation inside spec files.
*   **API-Accelerated Data Seeding:** Utilizes Playwright’s backend request context to seed data (e.g., creating articles or posting comments) instantly before UI assertions execute, ensuring isolated, independent test states.
*   **Fail-Safe CI/CD Visibility:** Completely integrated with GitHub Actions to trigger test runs on every pull request, configuring automatic retries and generating trace reports on failure.

---

## 🛠️ Tech Stack & Tools

*   **Engine:** Playwright 
*   **Language:** TypeScript
*   **Design Pattern:** Page Object Model (POM) & Custom Fixtures
*   **CI/CD Orchestration:** GitHub Actions
*   **Reporting:** Playwright HTML Reporter & Built-in Trace Viewer

---

## 🗂️ Project Structure

```text
├── .github/workflows/       # Continuous Integration pipeline setup
├── src/
│   ├── pages/               # Page Objects 
│   ├── fixtures/            # Custom Playwright test fixture extensions
│   └── utils/               # Network/API utility helper suites
├── tests/
│   ├── auth.setup.ts        # One-time global API authorization layer
│   └── *.spec.ts            # Functional UI end-to-end test suites
├── test-data/               # Dynamic or structured environment datasets
├── playwright.config.ts     # Centralized framework and browser execution engine
└── README.md
