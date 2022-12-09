// CORS error
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
