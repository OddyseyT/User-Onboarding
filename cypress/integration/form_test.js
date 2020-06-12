context("Form -- testing our form inputs", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("add text to inputs and submit form", function (){
        cy.get('[data-cy="name"]').type("Elvis Costello").should("have.value", "Elvis Costello");
        cy.get('[data-cy="email"]').type("pumpitup@gmail.com").should("have.value", "pumpitup@gmail.com");
        cy.get('[data-cy="password"]').type("6Pence").should("have.value", "6Pence");
        cy.get('[data-cy="terms"]').check().should("be.checked");
        cy.get("[data-cy=submit]").click();
    })
});
