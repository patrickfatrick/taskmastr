// __tests__/to-unix-test.js
jest.dontMock('../src/modules/to-unix');
jest.dontMock('../src/modules/to-date');

describe('toUnix', function () {
 it('converts a string to a unix timestamp', function () {
	 var toUnix = require('../src/modules/to-unix');
   expect(toUnix('April 11, 1988')).toBe(576741600000);
 });
});