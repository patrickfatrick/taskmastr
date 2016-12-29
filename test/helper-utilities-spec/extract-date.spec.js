/* global describe sinon it beforeEach afterEach */
import chai from 'chai'
import gregorian from 'gregorian'
import extractDate from '../../src/helper-utilities/extract-date'

chai.should()

describe('extractDate', () => {
  let clock

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
  })

  afterEach(() => {
    clock.restore()
  })

  it('finds a date and returns the string and the date object', () => {
    const string = 'see you next monday'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', '2016-01-05T00:00:00.000Z')
  })

  it('works with colloquial dates (no punctuation)', () => {
    const string = 'see you on Jan 9 2016'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', gregorian.reform('Jan 9, 2016').set(0, 'h').to('iso'))
  })

  it('works with colloquial dates (with punctuation)', () => {
    const string = 'see you on Jan. 9, 2016'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', gregorian.reform('Jan 9, 2016').set(0, 'h').to('iso'))
  })

  it('works with American dates', () => {
    const string = 'see you on 01/09/2016'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', gregorian.reform('Jan 9, 2016').set(0, 'h').to('iso'))
  })

  it('works with "next week"', () => {
    const string = 'see you next week'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', '2016-01-08T00:00:00.000Z')
  })

  it('works with just days of the week', () => {
    const string = 'see you on sunday'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', '2016-01-04T00:00:00.000Z')
  })

  it('works with "tomorrow"', () => {
    const string = 'see you tomorrow'
    const extract = extractDate(string)
    extract.should.have.property('item', 'See you')
    extract.should.have.property('dueDate', '2016-01-02T00:00:00.000Z')
  })
})
