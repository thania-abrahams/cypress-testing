describe("Cura Make An Appointment", () => {
  // examples of Hooks
  before(() => {
    cy.log("Hello from the before hook");
  });

  after(() => {
    cy.log("Hello from the after hook");
  });

  beforeEach(() => {
    cy.log("Hello from the beforeEach hook");
  });
  // end

  // cura case study
  it("visit the URL", () => {
    cy.visit("/");

    cy.url().then((url) => {
      cy.log(`Printing the url ${url}`);

      cy.title().then((title) => {
        cy.log(title);

        expect(title).to.be.equal("CURA Healthcare Service");
      });
    });
  });

  it("click Make An Appointment", () => {
    // click ID #btn-make-appointment
    cy.get("#btn-make-appointment").click();
  });

  it("log in", () => {
    // input - Enter username #txt-username
    cy.get("#txt-username").type("John Doe");

    // input - Enter password #txt-password
    cy.get("#txt-password").type("ThisIsNotAPassword");

    // button - Click #btn-login
    cy.get("#btn-login").click();
  });

  it("make Appointment", () => {
    // select - Select Seoul CURA Healthcare Center
    cy.get("#combo_facility").select("Seoul CURA Healthcare Center");

    // checkbox - Check #chk_hospotal_readmission
    cy.get("#chk_hospotal_readmission").check({ force: true });

    // checkbox - Check #radio_program_medicaid
    cy.get("#radio_program_medicaid").click();

    // input - Get Date #txt_visit_date
    cy.get("#txt_visit_date").type("22/11/2022");

    // form - Get #txt_comment
    cy.get("#txt_comment").click({ force: true });

    cy.get("#txt_comment").type(
      "Thania Abrahams will be available at 22/11/2022"
    );

    // button - click #btn-book-appointment
    cy.get("#btn-book-appointment").click();

    cy.url().should("include", "summary");
  });

  it("verify Appointment", () => {
    // h2 - confirm text content
    cy.get("h2").contains("Appointment Confirmation");

    // p - confirm text content #visit_date
    cy.get("#comment").contains("22/11/2022");

    cy.get;
  });
});

describe("Click Scenarios", () => {
  it("class assertions", () => {
    cy.visit("http://uitestingplayground.com/click");

    cy.get("#badButton")
      .click()
      .should("have.class", "btn-success")
      .and("have.css", "background-color", "rgb(40, 167, 69)");
  });

  it("styling assertions", () => {
    cy.visit("http://uitestingplayground.com/mouseover");

    cy.get(".text-primary").realHover();

    cy.get(".text-warning");
    //   .click()
    //   .should("have.class", "btn-success")
    //   .and("have.css", "background-color", "rgb(40, 167, 69)");
  });

  it("dynamic table assertions", () => {
    cy.visit("http://uitestingplayground.com/dynamictable");

    cy.get(`div[role="row"] span`).each((cell) => {
      if (cell.text().includes("Chrome")) {
        cy.log(`I have found the ${cell.text()} row`);

        let chromeRowValues = [];

        chromeRowValues.push(cell.next().text());

        chromeRowValues.push(cell.next().next().text());

        chromeRowValues.push(cell.next().next().next().text());

        chromeRowValues.push(cell.next().next().next().next().text());

        cy.log("I am all the Chrome values", chromeRowValues);

        chromeRowValues.forEach((chromeRowValue) => {
          if (chromeRowValue.includes("%")) {
            cy.log(chromeRowValue);
          }
        });
      }
    });
  });
});

describe("Viewport Demo", () => {
  it("device specification", () => {
    cy.visit(`${Cypress.env("angular")}/angularjs-protractor-practice-site`);

    cy.viewport("iphone-6");

    cy.get("#mobile_menu_toggler").should("be.visible");
  });

  it("viewport specification", () => {
    cy.visit(`${Cypress.env("angular")}/angularjs-protractor-practice-site`);

    cy.viewport("500, 600");

    cy.get("#mobile_menu_toggler").should("be.visible");
  });
});

describe("Checkbox Scenarios", () => {
  it("text assertions with forced click", () => {
    cy.visit(`${Cypress.env("demo")}/checkbox`);

    cy.get(`input[type="checkbox"]`).click({ force: true });

    cy.get("#result").should(
      "have.text",
      "You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile"
    );
  });
});

describe("Multiple Checkbox Scenarios", () => {
  it("click on nth-index checkbox", () => {
    cy.visit(`${Cypress.env("theInternet")}/checkboxes`);

    cy.get("form#checkboxes input").eq(0).click().should("be.checked");
  });
});

describe("New Tab", () => {
  it("first approach, not click on the link", () => {
    cy.visit(`${Cypress.env("demo")}/links`);

    cy.get("#simpleLink").should("have.attr", "href", "https://demoqa.com");

    cy.get("#simpleLink").should("have.attr", "target", "_blank");
  });

  it("second approach, remove the target", () => {
    cy.visit(`${Cypress.env("demo")}/links`);

    cy.get("#simpleLink").invoke("removeAttr", "target").click();

    cy.url().then((url) => {
      expect(url).to.be.eq("https://demoqa.com/");
    });
  });
});

describe("Intercepting API Requests", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/links`);

    cy.intercept("GET", `${Cypress.env("demo")}/created`).as("linkStatus"); // alias for later use via @
  });

  it("status code and status message assertion", () => {
    cy.get("#created", { timeout: 60000 }).click();

    cy.wait("@linkStatus").then((request) => {
      cy.log(request);

      expect(request.response.statusCode).to.be.eq(201);

      expect(request.response.statusMessage).to.be.eq("Created");
    });
  });

  // test app https://the-internet.herokuapp.com/status_codes
});

describe("Broken Images", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/broken`);
  });

  it("not broken image assertion", () => {
    cy.get('div > img[src="/images/Toolsqa.jpg"]')
      .find("img", { timeout: 100000 })
      .should("be.visible")
      .and((img) => {
        cy.log(img);
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("broken image assertion", () => {
    cy.get(`div img[src="/images/Toolsqa_1.jpg"]`)
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});

Cypress.config("defaultCommandTimeout", 60000);
describe("Index Selectors", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("theInternet")}/broken_images`);
  });

  it("broken image detected(first)", () => {
    cy.get("div.example > img")
      .first()
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("broken image detected(second)", () => {
    cy.get("div.example > img")
      .second()
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("broken image detected(last)", () => {
    cy.get("div.example > img")
      .last()
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});

//npm package documentation for cy.wait if needed
describe("File Uploads / Downloads", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/upload-download`);
  });

  it("upload a file", () => {
    cy.get("#uploadFile").attachFile("example.json");

    cy.get("#uploadedFilePath").should("contain", "example");
  });

  it("download a file", () => {
    cy.get("#downloadButton").click();

    cy.verifyDownload("sampleFile.jpeg");
  });
});

describe("iFrames", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/nestedframes`);
  });

  it("nested iframe", () => {
    cy.get("#frame1").then((iframe) => {
      const body = iframe.contents().find("body");

      cy.wrap(body).should("have.text", "Parent frame");

      cy.wrap(body)
        .find("iframe")
        .then((childIframe) => {
          const childBody = childIframe.contents().find("body");

          cy.wrap(childBody).should("have.text", "Child Iframe");
        });
    });
  });
});

describe("iFrame WYSIWYG Editor", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("theInternet")}/iframe`);
  });

  it("typing in editor", () => {
    cy.get("#mce_0_ifr").then((iframe) => {
      const body = iframe.contents().find("body");

      cy.wrap(body).find("p").type("{selectAll}{del}Thania Abrahams");

      cy.wrap(body).find("p").should("have.text", "Thania Abrahams");
    });
  });
});

Cypress.config("defaultCommandTimeout", 60000);
describe("Alerts", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("theInternet")}/javascript_alerts`);
  });

  it("click on alert", () => {
    cy.contains("button", "Click for JS Alert").click();

    cy.on("window:alert", (message) => {
      expect(message).to.be.equal("I am a JS Alert");
    });

    cy.on("window:confirm", () => true);

    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  it("click on alert (confirm)", () => {
    cy.contains("button", "Click for JS Confirm").click();

    cy.on("window:confirm", (message) => {
      expect(message).to.be.equal("I am a JS Confirm");
    });

    cy.on("window:confirm", () => true);

    cy.get("#result").should("have.text", "You clicked: Ok");
  });

  it("click on alert (cancel)", () => {
    cy.contains("button", "Click for JS Confirm").click();

    cy.on("window:confirm", (message) => {
      expect(message).to.be.equal("I am a JS Confirm");
    });

    cy.on("window:confirm", () => false);

    cy.get("#result").should("have.text", "You clicked: Cancel");
  });

  it("click on alert (prompt)", () => {
    cy.window().then((window) => {
      // replace a function, record its usage and control its behavior.
      cy.stub(window, "prompt").returns("This is the prompt alert");

      cy.contains("button", "Click for JS Prompt").click();
    });

    cy.get("#result").should(
      "have.text",
      "You entered: This is the prompt alert"
    );
  });
});

describe("Accordions", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/accordian`);
  });

  it("default accordion validation example", () => {
    cy.get("#section2Heading").click();

    // checking if the first description was hidden correctly.
    cy.get("#section1Heading").next().should("have.css", "display", "none");

    // checking if the second description is displayed
    cy.get("#section2Heading")
      .next()
      .should("have.css", "display", "block")
      .and("have.class", "show");
  });
});

describe("Autocomplete", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/auto-complete`);
  });

  it("autocomplete demo", () => {
    cy.get(".auto-complete__value-container").first().type("Y");
    cy.contains("#react-select-2-option-0", "Yellow").click();
    cy.get(".auto-complete__multi-value__label").should("have.text", "Yellow");

    // #react-select-2-option-0
  });
});

describe("Date Picker", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/date-picker`);
  });

  it("date picker demo", () => {
    cy.get("input#datePickerMonthYearInput").click();

    cy.get("select.react-datepicker__month-select").select("0");

    cy.get("select.react-datepicker__year-select").select("1900");

    cy.findByText("16").click();

    cy.get("input#datePickerMonthYearInput").should("have.value", "01/16/1900");
  });
});

describe("Tooltips", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/tool-tips`);
  });

  it("tooltip button", () => {
    cy.get("#toolTipButton").realHover();

    // cy.get(`div[role='tooltip']`);

    cy.get(".tooltip-inner").should("have.text", "You hovered over the Button");
  });

  it("tooltip <a />", () => {
    cy.contains("a", "Contrary").realHover();

    cy.get(".tooltip-inner").should(
      "have.text",
      "You hovered over the Contrary"
    );
  });
});

describe("Menus", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/menu`);
  });

  it("menu", () => {
    cy.get("a").contains("Main Item 2").realHover();

    cy.contains("a", "SUB SUB LIST »").realHover();
  });
});

describe("Drag and Drop", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/droppable`);
  });

  it("drag and drop demo", () => {
    cy.get("#draggable").drag("#droppable", { force: true });
  });
});

//https://docs.cypress.io/guides/references/experiments#Configuration
Cypress.session.clearAllSavedSessions();

//See cypress.config.js -----> experimentalSessionAndOrigin: true
describe("Preserve Login", () => {
  beforeEach(() => {
    cy.session("mySession", () => {
      cy.visit(`${Cypress.env("demo")}/login`);

      cy.get("#userName").type("test");

      cy.get("#password").type("Test1234*");

      cy.get("#login").click();

      cy.url().should("contain", "profile");
    });
  });

  after(() => {
    cy.log("I am running after all of the test cases are done");

    cy.clearCookies();

    cy.getCookies().then((cookies) => {
      expect(cookies).to.have.length(0);
    });
  });

  it("check if session was saved", () => {
    cy.visit(`${Cypress.env("demo")}/login`);
  });

  it("counting the cookies", () => {
    cy.getCookies().then((cookies) => {
      cy.log(cookies);
    });
  });
});

import { LoginPage } from "../pages/Login";
import { ProfilePage } from "../pages/Profile";

describe("Page Object Model Example - Code Reusability", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("demo")}/login`);
  });

  it("successful login", () => {
    // cy.get("#userName").type("test");
    // cy.get("#password").type("Test1234*");
    // cy.get("#login").click();

    LoginPage.submitLogin("test", "Test123*");

    //----- alternative method using the getter methods

    // LoginPage.usernameElement.type("test");

    // LoginPage.passwordElement.type("Test123*");

    // LoginPage.loginElement.click();

    // end -----

    cy.url().should("contain", "superwoman");

    cy.get(".main-header").should("have.text", "Profile");

    // ProfilePage.headerElement.should("have.text", "Profile");
  });

  it("failed login", () => {
    // cy.get("#userName").type("test");
    // cy.get("#password").type("Test1234*");
    // cy.get("#login").click();
    // cy.url().should("contain", "profile");

    LoginPage.submitLogin("wrongusername", "wrongpassword");

    cy.url().should("not.contain", "profile");

    cy.get(".main-header").should("have.text", "Login");

    // LoginPage.headerElement.should("have.text", "Login");

    cy.get("#name").should("have.text", "Invalid username or password!");
  });
});

// xampp plugin installed and mysqljs
describe("mySQL Database Testing", () => {
  it("create a movie table", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE movies(title VARCHAR(50) NOT NULL,genre VARCHAR(30) NOT NULL,director VARCHAR(60) NOT NULL,release_year INT NOT NULL,PRIMARY KEY(title));"
    );
  });

  it("insert a movie", () => {
    cy.task(
      "queryDb",
      `INSERT INTO movies VALUES ("Joker", "psychological thriller", "Todd Phillips", 2019),("The Batman", "action", "Matt Reeves", 2022);`
    ).then((result) => {
      expect(result.affectedRows).to.equal(2);

      expect(result.message).to.be.equal(
        "&Records: 2  Duplicates: 0  Warnings: 0"
      );
    });
  });

  it("select all movies", () => {
    cy.task("queryDb", `SELECT * FROM movies;`).then((result) => {
      cy.log("First row validation").then(() => {
        expect(result[0].director).to.equal("Todd Phillips");

        expect(result[0].genre).to.equal("psychological thriller");

        expect(result[0].release_year).to.equal(2019);

        expect(result[0].title).to.equal("Joker");
      });

      cy.log("Second row validation").then(() => {
        expect(result[1].director).to.equal("Matt Reeves");

        expect(result[1].genre).to.equal("action");

        expect(result[1].release_year).to.equal(2022);

        expect(result[1].title).to.equal("The Batman");
      });
    });
  });

  it("update a movie", () => {
    cy.task(
      "queryDb",
      `UPDATE movies SET genre = "test genre" WHERE title="Joker"`
    ).then((result) => {
      expect(result.changedRows).to.equal(1);
    });

    cy.task("queryDb", `SELECT genre FROM movies WHERE title="Joker"`).then(
      (result) => {
        expect(result[0].genre).to.equal("test genre");
      }
    );
  });

  it("delete the movie table", () => {
    cy.task("queryDb", `DROP TABLE movies`);
  });
});

describe("Mock API Requests", () => {
  beforeEach(function () {
    cy.visit(`${Cypress.env("demo")}/login`);

    cy.intercept(
      "GET",
      `${Cypress.env(
        "demo"
      )}/Account/v1/User/b614ecda-18b6-4e2f-989e-70c40336c321`,
      { fixture: "data.json" }
    ).as("mockDemo");
  });

  it("mocking the data", function () {
    LoginPage.submitLogin("test", "Test123*");

    cy.wait("@mockDemo");

    cy.get("#userName-value").should("have.text", "thania abrahams");
  });
});

import { isMobile } from "../support/utils";

describe("Viewport Iteration", () => {
  const viewportsToTest = ["iphone-3", "ipad-2", "macbook-15"];

  viewportsToTest.forEach((viewport) => {
    it(viewport, () => {
      cy.viewport(viewport);
    });
  });
});

describe("Hybrid Suite", () => {
  it("menu test", () => {
    cy.log("desktop validation");

    if (isMobile()) {
      cy.log("mobile validation");
    }
  });
});

const nowTimeStamp = new Date(Date.UTC(2017, 2, 14)).getTime();

describe("Clock Demo", () => {
  beforeEach(function () {
    cy.log("date timestamp: ", nowTimeStamp);

    // cy.log("Check the timestamp at: http://www.timestamp-converter.com/");

    cy.clock(nowTimeStamp);

    cy.visit("https://example.cypress.io/commands/spies-stubs-clocks");
  });

  it("demo", () => {
    cy.get("#clock-div").click().should("have.text", "1489449600");
  });

  it("tick demo", () => {
    cy.get("#tick-div").click().should("have.text", "1489449600");

    cy.log("Doing the cy.tick() to add 10 seconds: ").then(() => {
      cy.tick(10000); // 10 seconds passed

      cy.get("#tick-div").click().should("have.text", "1489449610");
    });
  });
});

describe("Data Post Demo", () => {
  it("random data", () => {
    cy.task("freshUser").then((object) => {
      cy.log("Data: ", object);
    });
  });
});

let foo = "";

describe.only("API Testing Demo", () => {
  it("get an authorization token from the API account", () => {
    cy.request("POST", `${Cypress.env("demo")}/Account/v1/GenerateToken`, {
      userName: "test",
      password: "Test123*",
    }).then((response) => {
      const token = response.body.token;

      cy.wrap(token).as("token");

      cy.get("@token").then((token) => {
        foo = token;

        cy.log(foo);
      });
    });
  });

  it("test", () => {
    cy.log(foo);
  });
});
