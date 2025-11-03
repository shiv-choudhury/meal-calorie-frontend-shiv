describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  describe("Form Validation", () => {
    it("should show error for empty email", () => {
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Sign In").click();
      cy.contains("Please enter your email").should("be.visible");
    });

    it("should show error for invalid email format", () => {
      cy.get('input[name="email"]').type("invalidemail");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Sign In").click();
      cy.contains("Please enter a valid email address").should("be.visible");
    });

    it("should show error for empty password", () => {
      cy.get('input[name="email"]').type("test@example.com");
      cy.contains("button", "Sign In").click();
      cy.contains("Please enter your password").should("be.visible");
    });

    it("should show error for password less than 6 characters", () => {
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("12345");
      cy.contains("button", "Sign In").click();
      cy.contains("Password must be at least 6 characters").should(
        "be.visible"
      );
    });
  });

  describe("Login Functionality", () => {
    it("should successfully login with valid credentials", () => {
      cy.intercept("POST", "/api/auth/login", {
        statusCode: 200,
        body: {
          data: {
            token: "fake-jwt-token"
          },
          message: "Logged in successfully"
        }
      }).as("loginRequest");

      cy.get('input[name="email"]').type("shiv@gmail.com");
      cy.get('input[name="password"]').type("123456");
      cy.contains("button", "Sign In").click();

      cy.contains("Logged in successfully").should("be.visible");
      cy.url().should("include", "/dashboard");
    });

    it("should show error message for invalid credentials", () => {
      cy.intercept("POST", "/api/auth/login", {
        statusCode: 401,
        body: {
          error: "Invalid credentials"
        }
      }).as("loginRequest");

      cy.get('input[name="email"]').type("wrong@example.com");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.contains("button", "Sign In").click();

      cy.contains("Invalid credentials").should("be.visible");
    });

    it("should disable submit button while logging in", () => {
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Sign In").click();

      cy.contains("button", "Signing In...").should("be.disabled");
    });

    it("should navigate to signup page when clicking signup link", () => {
      cy.contains("a", "Sign up").click();
      cy.url().should("include", "/signup");
    });
  });
});
