module.exports = class RegexBuilder {
  constructor({ flags = [] } = {}) {
    this.regexStr = '';
    this.flags = flags;
    this.startWith = false;
    this.endWith = false;
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
    this.regexStr += patterns.join('|');
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
      this.regexStr += `${this.group(pattern)}?`;
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
  build() {
    const regex = this.asString();
    if (this.flags.length > 0) {
      return new RegExp(regex, this.flags.join(''));
    }
    return new RegExp(regex);
  }

  /**
   * Returns the regex as a string
   */
  asString() {
    return this.regexStr;
  }
};
