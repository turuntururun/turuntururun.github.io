const Page = require('../pageObjects/main.page')

// todo learn to use this stuff
describe('Example test', () => {
  it('should open correct app', () => {
    Page.open()
    expect(browser).toHaveTitle('falcon-poc')
  })
})
