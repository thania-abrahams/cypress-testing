const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");

// mySQL requirements
const { mysql } = require("mysql");

// faker
const { faker } = require("@faker-js/faker");

module.exports = defineConfig({
  projectId: "wjofpf",
  e2e: {
    baseUrl: "https://katalon-demo-cura.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //----- verify download import
      on("task", verifyDownloadTasks);
      //-----

      //----- for the mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);
      //-----

      //----- mysql implemenation and faker
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
      //-----

      //----- faker
      on("task", {
        freshUser() {
          let user = {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registeredAt: faker.date.past(),
            vehicle: faker.vehicle.vehicle(),
          };
          return user;
        },
      });
      //-----
    },
    env: {
      angular: "https://www.globalsqa.com",
      demo: "https://demoqa.com",
      theInternet: "https://the-internet.herokuapp.com",
      db: {
        host: "localhost",
        user: "root",
        password: "",
        database: "cypress_test",
      },
      mobileViewportWidth: 400,
    },
    // must have configured in order to make sessions possible
    experimentalSessionAndOrigin: true,
  },
  pageLoadTimeout: 100000,
  viewportHeight: 1000,
  viewportWidth: 1400,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Documentation Reports",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
    html: true,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
  video: true,
  screenshotOnRunFailure: true,
});

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);

  // start connection to db
  connection.connect();

  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();

        // console.log(results)
        return resolve(results);
      }
    });
  });
}
