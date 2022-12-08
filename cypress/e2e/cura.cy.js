describe("Cura Make An Appointment", () => {
  //Examples of Hooks
  before(() => {
    cy.log("Hello from the before hook");
  });

  after(() => {
    cy.log("Hello from the after hook");
  });

  beforeEach(() => {
    cy.log("Hello from the beforeEach hook");
  });
  //End

  //Cura case study
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
    //Click ID #btn-make-appointment
    cy.get("#btn-make-appointment").click();
  });

  it("log in", () => {
    //Input - Enter username #txt-username
    cy.get("#txt-username").type("John Doe");

    //Input - Enter password #txt-password
    cy.get("#txt-password").type("ThisIsNotAPassword");

    //Button - Click #btn-login
    cy.get("#btn-login").click();
  });

  it("make Appointment", () => {
    //Select - Select Seoul CURA Healthcare Center
    cy.get("#combo_facility").select("Seoul CURA Healthcare Center");

    //Checkbox - Check #chk_hospotal_readmission
    cy.get("#chk_hospotal_readmission").check({ force: true });

    //Checkbox - Check #radio_program_medicaid
    cy.get("#radio_program_medicaid").click();

    //Input - Get Date #txt_visit_date
    cy.get("#txt_visit_date").type("22/11/2022");

    //Form - Get #txt_comment
    cy.get("#txt_comment").click({ force: true });

    cy.get("#txt_comment").type(
      "Thania Abrahams will be available at 22/11/2022"
    );

    //Button - Click #btn-book-appointment
    cy.get("#btn-book-appointment").click();

    cy.url().should("include", "summary");
  });

  it("verify Appointment", () => {
    //H2 - Confirm text content
    cy.get("h2").contains("Appointment Confirmation");

    //P - Confirm text content #visit_date
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
    cy.visit(`${Cypress.env("Angular")}/angularjs-protractor-practice-site`);

    cy.viewport("iphone-6");

    cy.get("#mobile_menu_toggler").should("be.visible");
  });

  it("viewport specification", () => {
    cy.visit(`${Cypress.env("Angular")}/angularjs-protractor-practice-site`);

    cy.viewport("500, 600");

    cy.get("#mobile_menu_toggler").should("be.visible");
  });
});

describe("Checkbox Scenarios", () => {
  it("text assertions with forced click", () => {
    cy.visit(`${Cypress.env("Demo")}/checkbox`);

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
    cy.visit(`${Cypress.env("Demo")}/links`);

    cy.get("#simpleLink").should("have.attr", "href", "https://demoqa.com");

    cy.get("#simpleLink").should("have.attr", "target", "_blank");
  });

  it("second approach, remove the target", () => {
    cy.visit(`${Cypress.env("Demo")}/links`);

    cy.get("#simpleLink").invoke("removeAttr", "target").click();

    cy.url().then((url) => {
      expect(url).to.be.eq("https://demoqa.com/");
    });
  });
});

describe("Intercepting API Requests", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/links`);

    cy.intercept("GET", `${Cypress.env("Demo")}/created`).as("linkStatus"); //Alias for later use via @
  });

  it("status code and status message assertion", () => {
    cy.get("#created", { timeout: 60000 }).click();

    cy.wait("@linkStatus").then((request) => {
      cy.log(request);

      expect(request.response.statusCode).to.be.eq(201);

      expect(request.response.statusMessage).to.be.eq("Created");
    });
  });
  //Test app https://the-internet.herokuapp.com/status_codes
});

describe("Broken Images", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/broken`);
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
    cy.visit(`${Cypress.env("Demo")}/upload-download`);
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
    cy.visit(`${Cypress.env("Demo")}/nestedframes`);
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
      //Replace a function, record its usage and control its behavior.
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
    cy.visit(`${Cypress.env("Demo")}/accordian`);
  });

  it("default accordion validation example", () => {
    cy.get("#section2Heading").click();

    //Checking if the first description was hidden correctly.
    cy.get("#section1Heading").next().should("have.css", "display", "none");

    //Checking if the second description is displayed
    cy.get("#section2Heading")
      .next()
      .should("have.css", "display", "block")
      .and("have.class", "show");
  });
});

describe("Autocomplete", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/auto-complete`);
  });

  it("autocomplete demo", () => {
    cy.get(".auto-complete__value-container").first().type("Y");
    cy.contains("#react-select-2-option-0", "Yellow").click();
    cy.get(".auto-complete__multi-value__label").should("have.text", "Yellow");
    //#react-select-2-option-0
  });
});

describe("Date Picker", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/date-picker`);
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
    cy.visit(`${Cypress.env("Demo")}/tool-tips`);
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
    cy.visit(`${Cypress.env("Demo")}/menu`);
  });

  it("menu", () => {
    cy.get("a").contains("Main Item 2").realHover();

    cy.contains("a", "SUB SUB LIST »").realHover();
  });
});

describe("Drag and Drop", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/droppable`);
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
      cy.visit(`${Cypress.env("Demo")}/login`);

      cy.get("#userName").type("test");

      cy.get("#password").type("Test1234*");

      cy.get("#login").click();

      cy.url().should("contain", "profile");
    });
  });

  it("check if session was saved", () => {
    cy.visit(`${Cypress.env("Demo")}/login`);
  });

  it("check if session was saved", () => {
    cy.visit(`${Cypress.env("Demo")}/login`);
  });

  it("check if session was saved", () => {
    cy.visit(`${Cypress.env("Demo")}/login`);
  });
});

import { LoginPage } from "../../cypress/pages/Login";
import { ProfilePage } from "../../cypress/pages/Profile";

describe("Page Object Model Example - Code Reusability", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("Demo")}/login`);
  });

  it("successful login", () => {
    // cy.get("#userName").type("test");
    // cy.get("#password").type("Test1234*");
    // cy.get("#login").click();

    LoginPage.submitLogin("test", "Test123*");

    //Alternative method using the getter methods
    // LoginPage.usernameElement.type("test");

    // LoginPage.passwordElement.type("Test123*");

    // LoginPage.loginElement.click();

    cy.url().should("contain", "profile");

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
