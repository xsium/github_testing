describe("adduser test", () => {
  it("visit the page, fill the form, submit", () => {
    //fill form
    cy.visit("http://localhost/github_testing/adduser");
    cy.get('input[name="nom"]').type("Stormblight");
    cy.get('input[name="prenom"]').type("Tyrfing");
    cy.get('input[name="mail"]').type(
      Math.random().toString(36).substring(2, 15) + "test@test.com"
    );
    cy.get('input[name="mdp"]').type("pass123");

    //submit
    cy.get('input[name="submit"]').click();

    //historize
    cy.get("#msgzone")
      .invoke("text")
      .then((text) => {
        //paramétre JSON (nom du test, date, statut)
        const name = "addUser";
        let date = new Date();
        date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        const url = "http://localhost/github_testing/api/addTest";
        let json = "";
        if (text == "Le compte a été ajouté en BDD") {
          const valid = true;
          json = JSON.stringify({ name: name, valid: valid, date: date });
        } else if (text == "Les informations sont incorrectes") {
          const valid = false;
          json = JSON.stringify({ name: name, valid: valid, date: date });
        }
        cy.request({
          method: "POST",
          url: url,
          body: json,
        });
      });
  });
});
