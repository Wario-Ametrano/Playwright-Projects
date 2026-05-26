// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // creazione di progetti per eseguire i test in diversi contesti (browser, dispositivi, ecc.)
  projects: [

    { // faccio partire un progetto chiamato setup, esegue solo i test che terminano con .setup.js e utilizza le credenziali dichiarate del progetto
      name: 'setup',
      testMatch: /.*\.setup\.js/,//esegue solo i test che terminano con .setup.js
      use: { user:'Mariottide', password:'Test123!'},
    },
    {
      //faccio partire i test in un progetto chiamato chromium, utilizzo le impostazioni predefinite per desktop chrome e carico lo stato di autenticazione salvato nel file auth/user.json
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'auth/user.json' }, // utilizzo lo stato di autenticazione salvato nel file
      dependencies: ['setup'], // dipendenza dal progetto di setup
      //questo progetto esegui tutti i test della directory testDir: './tests', dichiarata sopra in export default defineConfig
    },
  /*  {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],user:'user1',env_var:process.env.ENVVAR, storageState:'.auth/user.json' }, 
      dependencies: ['setup'],
    },
*/
   /* {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState:'.auth/user.json' },
      dependencies: ['setup'],
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

