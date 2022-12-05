describe('Appointment', () => {
  it('should book an interview', () => {
    cy.visit('/')
    cy.contains("li", "Monday")
    cy.get("[alt=Add]")
 .first()
 .click();
  })
})
