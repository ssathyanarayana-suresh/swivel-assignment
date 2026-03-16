require('cypress-xpath');

import PageSelectorsAndActions from '../pages/pageSelectorsAndActions'

const pageSelectorsAndActions = new PageSelectorsAndActions()

describe('Amazon TV Purchase Flow', () => {

  let storedPrice = ''

  it('Search TV and verify price in cart', () => {

    // 1. Launch Amazon
        cy.visit('https://www.amazon.com', { timeout: 10000 })

        pageSelectorsAndActions.globalLocationPopoverLink({timeout: 10000 }).click()
        cy.wait(1000)
        pageSelectorsAndActions.zipUpdateInput({timeout: 10000 }).type("78738")
        pageSelectorsAndActions.zipUpdateButton({timeout: 10000}).click()
        cy.wait(1000)
        cy.contains("Continue", { timeout: 10000 }).click({ force: true })
        cy.wait(1000)

    // 2. Search for TV

        pageSelectorsAndActions.searchTextBox({ timeout: 10000 }).type("TV")
        cy.wait(1000)
        cy.get('#sac-suggestion-row-3-cell-1 > .s-suggestion' , { timeout: 10000 }).click({force: true})


    // 3. Select the third result
    cy.get('div.s-main-slot div[data-component-type="s-search-result"]')
      .eq(3)
      .within(() => {

        // Store price
        cy.get('.a-price-whole')
          .first()
          .invoke('text')
          .then((wholePrice) => {
            const storedWholePrice = wholePrice.trim()

        cy.get('.a-price-fraction')
          .first()
          .invoke('text')
          .then((fraction) => {
            const storedPriceFraction = fraction.trim()
            const completePrice = storedWholePrice+storedPriceFraction
            cy.log('Complete Price: ' + completePrice)
            cy.contains(completePrice, { timeout: 10000 }).click()
            storedPrice = completePrice
          })          
        })

    })

      // 4. Add to cart
      pageSelectorsAndActions.addToCartButton({ timeout: 10000 })
        .should('be.visible')
        .click()
      cy.wait(4000)  
      cy.get('body').then(($body) => {
        if ($body.find('#attachSiNoCoverage-announce').length > 0) {
          cy.get('#attachSiNoCoverage-announce').click({ force: true }, { timeout: 10000 })
        } else {
          cy.log('Button not present')
        }
      })


    // 5. Navigate to cart
    pageSelectorsAndActions.goToCartButton()
      .click()
    // 6. Verify price in cart
    cy.get('.sc-product-price')
      .first()
      .invoke('text')
      .then((cartPrice) => {
        const actualCartPrice = cartPrice.split('$')[1]
        cy.log('Cart price: ' + actualCartPrice)
        expect(actualCartPrice).to.contain(storedPrice)
      })

  })
})