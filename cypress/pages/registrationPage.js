class registrationPage {
    email = `input[id="email"]`
    password = `input[id="password"]`
    firstName = `input[id="first-name"]`
    lastName = `input[id="last-name"]`
    mobilePhone = `input[id="mobile-phone"]`
    address = `input[id="address"]`
    firstAdress = `ul[class="MuiList-root MuiList-padding"] > div:nth-child(1)`
    addressLine1 = `input[id="addressLine1"]`
    addressLine2 = `input[id="addressLine2"]`
    suburb = `input[id="city"]`
    postCode = `input[id="postcode"]`
    state = `div[id="stateCode"]`
    inputRegistrationForm(email, password, firstName, lasName, mobilePhone) {
        cy.get(`div[data-automation="single-sign-up-form"]`).should('be.visible');
        cy.get(this.password).should('be.visible')
        cy.get(this.email).type(email)
        cy.get(this.password).type(password)
        cy.get(this.firstName).type(firstName)
        cy.get(this.lastName).type(lasName)
        cy.get(this.mobilePhone).type(mobilePhone)
    }
    inpuAddresWithAutosuggestion(address) {
        cy.get(this.address).type(address)
        cy.wait(2000)
        cy.get(this.firstAdress).should('exist');
        cy.get(this.firstAdress).click()
        cy.get(this.firstAdress).should('not.exist');
    }
    inpuAddresWithManual(addressLine1,addressLine2,suburb,postCode) {
        cy.get(this.address).type("Python Street")
        cy.wait(2000)
        cy.xpath(`//span[contains(text(),'Enter Address Manually')]/..`).should('be.visible')
        cy.xpath(`//span[contains(text(),'Enter Address Manually')]/..`).click()
        cy.get(this.addressLine1).type(addressLine1)
        cy.get(this.addressLine1).type(addressLine2)
        cy.get(this.suburb).type(suburb)
        cy.get(this.postCode).type(postCode)
    }
}
export default new registrationPage();
