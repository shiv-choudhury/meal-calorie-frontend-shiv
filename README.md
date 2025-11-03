# NutriTrack - Calorie Tracking Application

Host link: https://meal-calorie-frontend-shiv.vercel.app

A Next.js application for tracking meal calories with user authentication and dark mode support.

## Features

- User authentication (Login/Signup)
- Calorie calculation for meals
- Search history tracking
- Dark/Light theme toggle
- Responsive design

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/shiv-choudhury/meal-calorie-frontend-shiv.git
cd meal-calorie-frontend-shiv
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Running Tests

This project uses Cypress for end-to-end testing. The test suite includes coverage for:

- Login functionality
- Signup process
- Dashboard features
- Theme switching

### Running Cypress Tests

1. Make sure the development server is running:

```bash
npm run dev
```

2. To open Cypress Test Runner (Interactive Mode):

```bash
npx cypress open
```

3. A browser will open automatically
4. choose e2e testing mode
5. choose a browser(Chrome)
6. In Specs - choose the test file to run e2e test

7. To run tests in headless mode:

```bash
npx cypress run
```

### Test Files Structure

The test files are located in `cypress/e2e/` directory:

- `login.cy.ts` - Login page tests
- `signup.cy.ts` - Signup page tests
- `dashboard.cy.ts` - Dashboard functionality tests

### Key Test Scenarios

1. **Login Page Tests**:

   - Form validation
   - Successful login
   - Error handling
   - Navigation

2. **Signup Page Tests**:

   - Form validation
   - Account creation
   - Error handling
   - Navigation

3. **Dashboard Tests**:
   - Authentication check
   - Meal search functionality
   - Logout process
