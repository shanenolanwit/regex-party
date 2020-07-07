// regex for optionally matching a sign at the start of a number
const SIGNED_REGEX = '(?:-|\\+)?';

module.exports = class NumberRegex {
  /**
   * regex that matches a single positive number
   */
  static positiveNumber() {
    return '\\d+';
  }

  /**
   * Regex that matches a single negative number
   */
  static negativeNumber() {
    return '-\\d+';
  }

  /**
   * Regex that matches a signed number which can optionally start with a
   * '-' or a '+'
   */
  static signedNumber() {
    return `${SIGNED_REGEX}${this.positiveNumber()}`;
  }

  /**
   * Regex that matches a positive decimal number
   */
  static positiveDecimal() {
    return '\\d+\\.\\d+';
  }

  /**
   * Regex matches a negative decimal number
   */
  static negativeDecimal() {
    return '-\\d+\\.\\d+';
  }

  /**
   * Regex that atches a signed decimal number which can optionally start with a
   * '-' or a '+'
   */
  static signedDecimalNumber() {
    return `${SIGNED_REGEX}${this.positiveDecimal()}`;
  }

  /**
   * Regex that matches a decimal number with an exact number of decimal places after the decimal point
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
   * Regex that matches a signed integer or decimal followed by a percentage sign
   */
  static percentage() {
    return '(?:-|\\+)?\\d*\\.?\\d+?%';
  }

  /**
   * Regex to match a number represented in scientific notation. Some examples that
   * match are [5.56789e+0, 1.2, -7.001e-2, -22.54e23, 555]
   */
  static scientificNotation() {
    return '(?:-|\\+)?\\d+\\.?\\d*(?:(?:e|E)(?:-|\\+)?\\d+)?';
  }
};
