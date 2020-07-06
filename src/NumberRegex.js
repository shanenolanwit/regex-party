module.exports = class NumberRegex {
  /**
   * Matches a single positive number
   */
  static positiveNumber() {
    return '\\d+';
  }

  /**
   * Matches a single negative number
   */
  static negativeNumber() {
    return '-\\d+';
  }

  /**
   * Matches a signed number which can optionally start with a
   * '-' or a '+'
   */
  static signedNumber() {
    return '(?:-|\\+)?\\d+';
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
    /**
     * Since digits are considered to be word characters,
     * \b4\b can be used to match a 4 that is not part of a larger number.
     * This regex does not match 44 sheets of a4.
     * So saying “\b matches before and after an alphanumeric sequence”
     * is more exact than saying “before and after a word”.
     */
    return `\\b\\d+\\.\\d{${decimalPlaces}}\\b`;
  }

  /**
   * Matches a signed integer or decimal followed by a percentage sign
   */
  static percentage() {
    return '(?:-|\\+)?\\d*\\.?\\d+?%';
  }
};
