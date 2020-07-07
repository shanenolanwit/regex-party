const assert = require('assert');
const NumberRegex = require('../src/NumberRegex');

describe('Unit: NumberRegex', () => {
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

  it('should match a signed number with a minus symbol', () => {
    const number = '-10';
    const regex = new RegExp(NumberRegex.signedNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a decimal number', () => {
    const number = '10.04';
    const regex = new RegExp(NumberRegex.positiveDecimal());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a positive decimal number', () => {
    const number = '10.04';
    const regex = new RegExp(NumberRegex.positiveDecimal());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a negative decimal number', () => {
    const number = '-10.04';
    const regex = new RegExp(NumberRegex.negativeDecimal());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a signed decimal with a plus symbol', () => {
    const number = '+10.00';
    const regex = new RegExp(NumberRegex.signedDecimalNumber());
    assert(number.match(regex), 'should have matched');
  });

  it('should match a signed decimal with a minus symbol', () => {
    const number = '-10.00';
    const regex = new RegExp(NumberRegex.signedDecimalNumber());
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

  it('should match a percentage', () => {
    const maxItems = 200;
    const regex = new RegExp(NumberRegex.percentage());
    Array.from({ length: maxItems }, () => Math.floor(Math.random() * maxItems))
      .forEach((number) => {
        const numberStr = `${number}%`;
        assert(numberStr.match(regex), 'should have matched');
      });
  });

  it('should match a percentage', () => {
    const maxItems = 200;
    const regex = new RegExp(NumberRegex.percentage());
    Array.from({ length: maxItems }, () => Math.floor(Math.random() * maxItems))
      .forEach((number) => {
        const numberStr = `${number}%`;
        const negativeNumberStr = `-${numberStr}`;
        const positiveNumberStr = `+${numberStr}`;
        assert(numberStr.match(regex), 'should have matched');
        assert(negativeNumberStr.match(regex), 'should have matched');
        assert(positiveNumberStr.match(regex), 'should have matched');
      });
  });

  it('should match numbers represented as scientific notation', () => {
    const testCases = [
      '5.56789e+0', '12E21', '12E219',
      '236E-19', '66.2e99', '22.54e23',
      '1.2', '555', '4.2', '-22.54e23',
      '+4.5', '3545.6578e240465863', '-7.001e-2'
    ];
    testCases.forEach((testCase) => {
      const regex = new RegExp(NumberRegex.scientificNotation());
      assert(testCase.match(regex), 'should have matched');
    });
  });
});
