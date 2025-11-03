describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
  });

  describe("Form Validation", () => {
    it("should show error for empty first name", () => {
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Create Account").click();
      cy.contains("Please enter your first name").should("be.visible");
    });

    it("should show error for empty last name", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Create Account").click();
      cy.contains("Please enter your last name").should("be.visible");
    });

    it("should show error for empty email", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Create Account").click();
      cy.contains("Please enter your email").should("be.visible");
    });

    it("should show error for invalid email format", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type("invalidemail");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Create Account").click();
      cy.contains("Please enter a valid email address").should("be.visible");
    });

    it("should show error for empty password", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type("test@example.com");
      cy.contains("button", "Create Account").click();
      cy.contains("Please enter your password").should("be.visible");
    });

    it("should show error for password less than 6 characters", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("12345");
      cy.contains("button", "Create Account").click();
      cy.contains("Password must be at least 6 characters").should(
        "be.visible"
      );
    });
  });

  describe("Signup Functionality", () => {
    it("should successfully create account with valid information", () => {
      const epochTime = Math.floor(Date.now() / 1000);

      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type(`john${epochTime}@example.com`);
      cy.get('input[name="password"]').type("123456");
      cy.contains("button", "Create Account").click();

      cy.contains("Account created successfully").should("be.visible");
      cy.url().should("include", "/dashboard");
    });

    it("should show error message for existing email", () => {
      cy.get('input[name="firstName"]').type("shiv");
      cy.get('input[name="lastName"]').type("test");
      cy.get('input[name="email"]').type("shiv@gmail.com");
      cy.get('input[name="password"]').type("123456");
      cy.contains("button", "Create Account").click();

      cy.contains("Email already in use").should("be.visible");
    });

    it("should disable submit button while creating account", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="email"]').type("john.doe@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.contains("button", "Create Account").click();

      cy.contains("button", "Creating Account...").should("be.disabled");
    });

    it("should navigate to login page when clicking sign in link", () => {
      cy.contains("a", "Sign in").click();
      cy.url().should("include", "/login");
    });
  });
});
