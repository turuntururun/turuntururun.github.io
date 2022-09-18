const Page = require('../pageObjects/main.page')

// todo implement testing with cypress??
describe('Example test', () => {
  it('should open correct app', () => {
    Page.open()
    expect(browser).toHaveTitle('falcon-poc')
  })
})
