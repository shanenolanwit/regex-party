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
   * Adds an array of patterns as an or condition to the regex
   *
   * @param {Array[string]} patterns an array of strings that should be joined as an or condition
   * @returns RegexBuilder - this instance
   */
  canMatch(patterns) {
    this.regexStr += `(${patterns.join('|')})`;
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
   * Matches a number
   *
   * @param {number} number the number to match
   * @returns RegexBuilder - this instance
   */
  number(number) {
    this.regexStr += `${number}`;
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
    if (pattern.length > 1) {
      this.regexStr += `(${pattern})?`;
    } else {
      this.regexStr += `${pattern}?`;
    }
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
   * Matches any character
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
