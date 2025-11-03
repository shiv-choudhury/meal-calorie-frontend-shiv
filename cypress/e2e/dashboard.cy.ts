describe("Dashboard Page", () => {
  function performLogin() {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("shiv@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.contains("button", "Sign In").click();

    cy.contains("Logged in successfully").should("be.visible");
    cy.url().should("include", "/dashboard");
  }

  it("should redirect to login if no token is present", () => {
    localStorage.removeItem("token");
    cy.visit("http://localhost:3000/dashboard");
    cy.url().should("include", "/login");
  });

  it("should perform meal search and display results", () => {
    performLogin();

    cy.intercept("GET", "/api/calories*", {
      statusCode: 200,
      body: {
        data: {
          dish_name: "Pizza",
          servings: 2,
          calories_per_serving: 300,
          total_calories: 600,
          source: "API"
        }
      }
    }).as("searchRequest");

    // Fill and submit the search form
    cy.get('input[name="dishname"]').type("Pizza");
    cy.get('input[name="servings"]').type("2");
    cy.get("#search-btn").click();
    cy.get("#calories_per_serving").should("have.text", "350");
    cy.get("#total_calories").should("have.text", "700");
  });

  it("should logout successfully", () => {
    performLogin();
    cy.get("#logout-btn").click();

    cy.url().should("include", "/login");

    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .should("be.null");
  });
});
