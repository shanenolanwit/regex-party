module.exports = class NumberRegex {
  /**
   * Matches a single positive number
   */
  static positiveNumber() {
    return '\\d';
  }

  /**
   * Matches a single negative number
   */
  static negativeNumber() {
    return '-\\d';
  }

  /**
   * Matches a decimal number
   */
  static decimalNumber() {
    return '\\d+\\.\\d+';
  }

  /**
   * Matches a decimal number with an exact number of decimal places after the decimal point
   *
   * @param {number} decimalPlaces the number of decimal places to match
   */
  static decimalNumberWithExactPlaces(decimalPlaces) {
    return `\\d+\\.\\d{${decimalPlaces}}`;
  }
};
