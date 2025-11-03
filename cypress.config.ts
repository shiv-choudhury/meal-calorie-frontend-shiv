import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // set api call waiting time to 10 secs
      config.defaultCommandTimeout = 10000;
      return config;
    }
  }
});
