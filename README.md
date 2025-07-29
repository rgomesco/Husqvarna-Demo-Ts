# Husqvarna Demo TS

This project is an automated UI testing suite for a Husqvarna e-commerce site. It uses the Page Object Model (POM) pattern to organize test code and TestCafe as the test runner.

## Project Structure

- `page-objects/` - Page Object Model classes for pages and components
  - `components/` - Reusable UI components (NavBar, Footer, etc.)
  - `pages/` - Page objects for main site pages (Home, Checkout, Product Category, etc.)
- `reports/` - Test reports and screenshots
- `testData/` - Test data
- `tests/` - TestCafe test files
- `utilities/` - Helper utilities
- `package.json` - Project dependencies and scripts

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm run tests
```

### Test Reports

- Allure reports are generated in the `reports/allure` directory.
- HTML reports are generated in the `reports/` directory.
- Screenshots of failed tests are saved in `reports/screenshots/`.

## Customization

- Update .testcaferc.js configaration file as needed. (Browser, headless, concurrency)
