/// <reference types="Cypress" />

describe('Smoke Tests', () => {
    it('Can fill out demo request', () => {
      cy.visit('/')

      cy.contains('.button', 'Get a Demo').click()

      cy.url().should('include', '/demo')
  
      cy.get('.hbspt-form').within(($form) => {
          cy.get('[name=firstname]')
            .type('William')
            .should('have.value', 'William')

          cy.get('[name=lastname]')
            .type('Shakespeare')
            .should('have.value', 'Shakespeare')

          cy.get('[name=email]')
            .type('thebard@example.com')
            .should('have.value', 'thebard@example.com')

          cy.get('[name=phone]')
            .type('555-555-5555')
            .should('have.value', '555-555-5555')

          cy.get('[name=company]')
            .type('Lord Chamberlain\'s Men')
            .should('have.value', 'Lord Chamberlain\'s Men')

          cy.get('.hs-dateinput').click();
          cy.get('.is-today').click();
        
          cy.get('.hs-dateinput')
            .invoke('val')
            .then(selectedDate => cy.get('.hs-dateinput')
                .should('have.value', selectedDate)
            );

          cy.get('[name=demo_time]').select('09:00 AM (EST)')
            .invoke('val')
            .then(selectedTime => cy.get('[name=demo_time]')
                .should('have.value', selectedTime)
            );
      })
    })

    it('Can navigate through Solutions tab', () => {
        cy.visit('/')
        var descriptions = ["Simple, flexible, all-in-one recognition is within reach.", "Say hello to modern service awards and milestones.", "The largest reward network in the world with Amazon Business.", "Easy employee incentives that will actually motivate your people.", "Simple, powerful, transparent program administration."];
        var urls = ["/recognize", "/celebrate", "/reward", "/earn", "/manage"]

        for (let i = 0; i < descriptions.length; i++) {
            cy.get('#w-dropdown-toggle-0').trigger('mouseover');
            cy.get('.navigation-drop-container').should('be.visible');

            cy.get('.navigation-column').within(() => {
            cy.get('.text-block-9')
            .contains(`${descriptions[i]}`)
            .click();
            cy.url().should('contain', `${urls[i]}`);
            })
        }
    })

    it('Can contact company', () => {
        cy.visit('/')
        cy.get('#w-dropdown-toggle-2').trigger('mouseover');
        cy.get('.menu-title')
          .contains('Contact')
          .click();
        cy.url().should('contain', '/contact')

        cy.get('.contact')
          .contains('Talk to Sales')
          .click({force: true})
        cy.url().should('contain', '/demo')
        cy.go('back')
        cy.url().should('contain', '/contact')

        cy.get(':nth-child(4) > .contact')
          .should('have.prop', 'href')
          .and('equal', 'https://awardco.zendesk.com/hc/en-us/articles/115004083928-Submitting-a-Support-Ticket')

        cy.get(':nth-child(5) > .contact')
          .should('have.prop', 'href')
          .and('equal', 'https://app.awardco.com/start/login')
    });
  })