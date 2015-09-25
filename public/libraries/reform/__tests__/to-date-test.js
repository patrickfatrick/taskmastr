// __tests__/to-date-test.js
jest.dontMock('../src/modules/to-date');

describe('toDate', function () {
 it('converts a string to a date object', function() {
	 var toDate = require('../src/modules/to-date');
   expect(toDate('04/11/1988').toISOString()).toBe('1988-04-11T06:00:00.000Z');
 });
});