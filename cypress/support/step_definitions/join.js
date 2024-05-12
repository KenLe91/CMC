import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import registrationPage from "../../pages/registrationPage";

Given("I Am on a Home Page", () => {
  cy.visit("https://www.myer.com.au/");
});
When("I click on Account Menu and click on Join", () => {
  cy.get('div[data-automation="tooltip"]').click()
  cy.get('a[data-automation="dropdownJoinLink"]').click()
});
Then("I should be redirected to the join page", () => {
  cy.get('div[data-automation="single-sign-up-form"]').should('be.visible');
});
When("I click on Create Account", () => {
  cy.wait(500).xpath(`//span[text()='Create Account']`).click({ force: true });
})
Then("I should see the create account form", () => {
  cy.xpath(`//p[contains(text(),'Create your online account today.')]`).should('be.visible');
})
When(/I fill in registration form email "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" auto suggestion/, (password, firstName, lasName, mobile, address) => {
  const dayjs = require('dayjs');
  const emailDay = dayjs().format('YYYYMMDDHHmmss')
  const email = "test" + emailDay + "@gmail.com"
  registrationPage.inputRegistrationForm(email, password, firstName, lasName, mobile)
  registrationPage.inpuAddresWithAutosuggestion(address)
})
When("I click on Create Account button", () => {
  cy.get(`//span[contains(text(),'Create Account')]`).click({ force: true });
  cy.wait(5000)
})
Then("I create new account successfully and navigate to the My Account page", () => {
  cy.xpath(`//span[contains(text(),'Your account is now active')]`).should('be.visible');
  cy.location('href').should('include', '/account')
})
When(/I fill in registration form with address manualy/, (password, firstName, lasName, mobile) => {
  cy.fixture('user.json').then((users) => {
    const dayjs = require('dayjs');
    const emailDay = dayjs().format('YYYYMMDDHHmmss')
    const email = "test" + emailDay + "@gmail.com"
    registrationPage.inputRegistrationForm(email, users.valid.password, users.valid.firstName, users.valid.lastName, users.valid.mobile)
    registrationPage.inpuAddresWithManual("5 California Road", " ", "Oxenford", "4210")
    cy.get(`button[id="create-account"]`).click({ force: true });
  })

})
When(/I fill in registration form with (valid|invalid) value/, (state) => {
  cy.fixture('user.json').then((users) => {
    switch (state) {
      case 'invalid':
        registrationPage.inputRegistrationForm(users.invalid.email, users.invalid.password, users.invalid.firstName, users.invalid.lastName, users.invalid.mobile)
        cy.get(`button[id="create-account"]`).click({ force: true });
        break;
      case 'valid':
        const dayjs = require('dayjs');
        const emailDay = dayjs().format('YYYYMMDDHHmmss')
        const email = "test" + emailDay + "@gmail.com"
        registrationPage.inputRegistrationForm(email, users.valid.password, users.valid.firstName, users.valid.lastName, users.valid.mobile)
        registrationPage.inpuAddresWithAutosuggestion(users.valid.address)
        cy.get(`button[id="create-account"]`).click({ force: true });
    }
  })
})
When(/I fill email "(.*)" already exited/, (value) => {
  cy.get(`#email`).type(value)
  cy.get(`button[id="create-account"]`).click({ force: true });
})
Then(/I can see invalid credentials message of id "(.*)" should have text "(.*)"/, (field, value) => {
  cy.get(`#${field}`).contains(value).should('be.visible')
})
Then(/I should( not)? see the password/, (condition) => {
  cy.xpath(`//input[@id="password" and @type="text"]`).should(condition ? 'not.exist' : 'exist')
})
When("I click on icon hidden password", () => {
  cy.get(`#password`).click()
  cy.get(`button[data-automation="password-hidden-icon"]`).click()
})
Then(/I should see the "(.*)" message "(.*)"/, (state, message) => {
  cy.xpath(`//span[contains(text(),'${message}')]/..//*[local-name() = 'svg']`).should('have.attr', 'color', state)
})
Then(/The checkbox with id "(.*)" should be (selected|unselected)/, (id, condition) =>
  cy.get(`#${id}`).should(condition === 'selected' ? 'be.checked' : 'not.be.checked')
)
When(/I fill "(.*)" on the password field/, (password) => {
  cy.get(`#password`).type(password)
  cy.get(`button[id="create-account"]`).click({ force: true });
})