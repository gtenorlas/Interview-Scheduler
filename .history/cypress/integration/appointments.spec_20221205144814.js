describe('Appointment', () => {
  it('should book an interview', () => {
    cy.visit('/')
    cy.contains("li", "Tuesday")
  })
})
