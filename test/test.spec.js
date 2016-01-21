/* global describe it */
import chai from 'chai'

chai.should()
describe('test test', () => {
  it('should pass', () => {
    const test = true
    test.should.be.true
  })
})
