describe('Appointment', () => {
  it('should book an interview', () => {
    cy.visit('/')
    cy.contains('li', 'Monday')
    cy.get('[alt=Add]').first().click()
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
  })
})
