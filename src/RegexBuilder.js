
module.exports = class RegexBuilder {
  constructor({ flags = [] } = {}) {
    this.regexStr = '';
    this.flags = flags;
  }

  /**
   * If set to true, removes the i flag to make matches case sensitive
   * If set to false, adds the i flag to make matches case insensitive
   * @param {*} caseSensitive
   */
  caseSensitive(caseSensitive) {
    if (!caseSensitive && !this.flags.includes('i')) {
      this.flags.push('i');
    } else {
      this.flags = this.flags.filter(f => f !== 'i');
    }
    return this;
  }

  /**
   * Adds a starts with condition to the regex with the given pattern
   *
   * @param {string} pattern pattern
   * @returns RegexBuilder - this instance
   */
  startsWith(pattern) {
    this.regexStr = `^${pattern}${this.regexStr}`;
    return this;
  }

  /**
   * Adds an ends with condition to the regex with the given pattern
   *
   * @param {string} pattern the pattern to end with
   * @returns RegexBuilder - this instance
   */
  endsWith(pattern) {
    this.regexStr = `${this.regexStr}${pattern}$`;
    return this;
  }

  /**
   * Adds the given pattern to the regex
   *
   * @param {string} pattern the pattern to match
   * @returns RegexBuilder - this instance
   */
  then(pattern) {
    this.regexStr += `${pattern}`;
    return this;
  }

  /**
   * Adds the given pattern to the regex
   *
   * @param {string} pattern the pattern to match
   * @returns RegexBuilder - this instance
   */
  followedBy(pattern) {
    return this.then(pattern);
  }

  /**
   * Adds the given pattern to the regex
   *
   * @param {string} pattern the pattern to match
   * @returns RegexBuilder - this instance
   */
  match(pattern) {
    return this.then(pattern);
  }

  /**
   * Matches any alphanumeric characters one or more times
   */
  word() {
    this.regexStr += '\\w+';
    return this;
  }

  /**
   * Matches an upper case letter
   */
  uppercaseLetter() {
    this.regexStr += '[A-Z]';
    return this;
  }

  /**
   * Matches lower case letter
   */
  lowercaseLetter() {
    this.regexStr += '[a-z]';
    return this;
  }

  /**
   * Creates a character range from the given characters
   *
   * @param {string} fromChar a single character to start from
   * @param {string} toChar a single character to match up to
   * @throws {Error} throws an error if the starting character is greater than the ending character
   * or if the characters casings are different.
   */
  characterRange(fromChar, toChar) {
    if (fromChar > toChar) {
      throw new Error('Start of character range'
      + ' is greater than the end character, make sure both characters are the same casing.');
    }
    this.regexStr += `[${fromChar}-${toChar}]`;
    return this;
  }

  /**
   * Makes sure the previous pattern is followed by the given pattern
   *
   * @param {string} pattern the pattern to match
   */
  mustBeFollowedBy(pattern) {
    this.regexStr += `(?=${pattern})`;
    return this;
  }

  /**
   * Makes sure the previous pattern is not followed by the given pattern
   *
   * @param {string} pattern the pattern to match
   */
  mustNotBeFollowedBy(pattern) {
    this.regexStr += `(?!${pattern})`;
    return this;
  }

  /**
   * Adds an array of patterns as an or condition to the regex
   *
   * @param {Array[string]} patterns an array of strings that should be joined as an or condition
   * @returns RegexBuilder - this instance
   */
  canMatch(patterns) {
    this.regexStr += `(?:${patterns.join('|')})`;
    return this;
  }

  /**
   * Adds an array of patterns as an or condition to the regex
   *
   * @param {Array[string]} patterns an array of strings that should be joined as an or condition
   * @returns RegexBuilder - this instance
   */
  eitherOf(patterns) {
    return this.canMatch(patterns);
  }

  /**
   * Matches any character at least once except for the given characters
   *
   * @param {string[]} values an array of characters to not match
   */
  anythingBut(values) {
    this.regexStr += `[^${values.join('')}]`;
    return this;
  }

  /**
   * Adds an or condition to the regex
   *
   * @param {string} pattern the pattern to add as an or condition to the regex
   * @returns RegexBuilder - this instance
   */
  or(pattern) {
    this.regexStr += `|${pattern}`;
    return this;
  }

  /**
   * Matches a number once
   *
   * @param {number} number the number to match
   * @returns RegexBuilder - this instance
   */
  number() {
    this.regexStr += '\\d';
    return this;
  }

  /**
   * Matches a number or or more times
   */
  numbers() {
    this.regexStr += '\\d+';
    return this;
  }

  /**
   * Matches a single space
   */
  space() {
    this.regexStr += ' ';
    return this;
  }

  /**
   * Matches a single whitespace
   */
  whitespace() {
    this.regexStr += '\\s';
    return this;
  }

  /**
   * Matches a single tab
   */
  tab() {
    this.regexStr += '\\t';
    return this;
  }

  /**
   * Matches a new line or line break
   */
  newLine() {
    this.regexStr += '(?:\\r\\n|\\r|\\n)';
    return this;
  }

  /**
   * Matches a pattern a specified number of times
   *
   * @param {number} nTimes the amount of times to match the pattern
   * @returns RegexBuilder - this instance
   */
  exactlyNTimes(nTimes) {
    this.regexStr += `{${nTimes}}`;
    return this;
  }

  /**
   * Adds a pattern to the regex which should be repeated a given number of times
   *
   * @param {string} pattern the pattern to repeat
   * @param {number} numberOfRepeats the number of times to repeat the pattern
   */
  repeat(pattern, numberOfRepeats) {
    this.regexStr += `(?:${pattern}){${numberOfRepeats}}`;
    return this;
  }

  /**
   * Adds a rule to match the current pattern one or more times
   *
   * @returns RegexBuilder - this instance
   */
  oneOrMoreTimes() {
    this.regexStr += '+';
    return this;
  }

  /**
   * Adds a rule to match the current pattern zero or more times
   *
   * @returns RegexBuilder - this instance
   */
  zeroOrMoreTimes() {
    this.regexStr += '*';
    return this;
  }

  /**
   * Makes a pattern optional
   *
   * @param {string} pattern the patten to make optional
   * @returns RegexBuilder - this instance
   */
  optional(pattern) {
    this.regexStr += `(?:${pattern})?`;
    return this;
  }

  /**
   * Makes a pattern optional
   *
   * @param {string} pattern the pattern to make optional
   * @returns RegexBuilder - this instance
   */
  maybe(pattern) {
    return this.optional(pattern);
  }

  /**
   * Matches any character once
   *
   * @returns RegexBuilder - this instance
   */
  anything() {
    this.regexStr += '.';
    return this;
  }

  /**
   * Wraps the pattern in a capture group
   *
   * @param {string} pattern the pattern to match
   * @returns RegexBuilder - this instance
   */
  group(pattern) {
    this.regexStr += `(${pattern})`;
    return this;
  }

  /**
   * Builds the regex expression pattern
   *
   * @returns RegExp - the regular expression object
   */
  toRegExp() {
    if (this.flags.length > 0) {
      return new RegExp(this.regexStr, this.flags.join(''));
    }
    return new RegExp(this.regexStr);
  }

  /**
   * Returns the regex as a string
   */
  toRegexString() {
    return this.regexStr;
  }
};
