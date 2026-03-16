require('cypress-xpath');

class PageSelectorsAndActions {

  globalLocationPopoverLink() {
    return cy.get('#nav-global-location-popover-link')
  }

  zipUpdateInput() {
    return cy.get('#GLUXZipUpdateInput')
  }

  zipUpdateButton() {
    return cy.xpath('//*[@id="GLUXZipUpdate"]/span/input') 
  }   

  searchTextBox() {
    return cy.xpath('//*[@id="twotabsearchtextbox"]')
  }

  addToCartButton() {
    return cy.get('#add-to-cart-button')
  }

  goToCartButton() {  
    return cy.get('#nav-cart')
  }

}

export default PageSelectorsAndActions