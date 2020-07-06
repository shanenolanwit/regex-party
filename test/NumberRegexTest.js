const assert = require('assert');
const NumberRegex = require('../src/NumberRegex');

describe.only('Unit: NumberRegex', () => {
  it('should match a positive number', () => {
    const number = '10';
    const regex = new RegExp(NumberRegex.positiveNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a negative number', () => {
    const number = '-10';
    const regex = new RegExp(NumberRegex.negativeNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a signed number with a plus symbol', () => {
    const number = '+10';
    const regex = new RegExp(NumberRegex.signedNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a signed number with a negative symbol', () => {
    const number = '-10';
    const regex = new RegExp(NumberRegex.signedNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a decimal number', () => {
    const number = '10.04';
    const regex = new RegExp(NumberRegex.decimalNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a decimal number', () => {
    const number = '10.04';
    const regex = new RegExp(NumberRegex.decimalNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a decimal number with exact decimal places', () => {
    const number = '10.0456';
    const regex = new RegExp(NumberRegex.decimalNumberWithExactPlaces(4));
    assert(number.match(regex), 'should have matched');
  });

  it('should not match a decimal number to an exact decimal place if the number has too few decimal places', () => {
    const number = '10.045';
    const regex = new RegExp(NumberRegex.decimalNumberWithExactPlaces(4));
    assert(!number.match(regex), 'should not have matched');
  });

  it('should not match a decimal number to an exact decimal place if the number has too many decimal places', () => {
    const number = '10.04567';
    const regex = new RegExp(NumberRegex.decimalNumberWithExactPlaces(4));
    assert(!number.match(regex), 'should not have matched');
  });
});
