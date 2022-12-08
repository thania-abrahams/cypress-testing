const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://katalon-demo-cura.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", verifyDownloadTasks);
    },
    env: {
      Angular: "https://www.globalsqa.com",
      Demo: "https://demoqa.com",
      theInternet: "https://the-internet.herokuapp.com",
    },
    //Must have configured in order to make sessions possible
    experimentalSessionAndOrigin: true,
  },
  pageLoadTimeout: 100000,
  viewportHeight: 1000,
  viewportWidth: 1400,
  // reporter: "mochawesome",
  // reporterOptions: {
  //   reportDir: "cypress/report/mochawesome-report",
  //   overwrite: true,
  //   html: true,
  //   json: true,
  //   timestamp: "mmddyyyy_HHMMss",
  // },
});
