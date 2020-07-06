
module.exports = class RegexBuilder {
  constructor({ flags = [] } = {}) {
    this.regexStr = '';
    this.flags = flags;
    this.patternTracker = { expressions: [] };
  }

  /**
   * If set to true, removes the i flag to make matches case sensitive
   * If set to false, adds the i flag to make matches case insensitive
   * @param {*} caseSensitive
   */
  caseSensitive(caseSensitive) {
    if (!caseSensitive && !this.flags.includes('i')) {
      this.flags.push('i');
      this.patternTracker.caseSensitive = 'true';
    } else {
      this.flags = this.flags.filter(f => f !== 'i');
      this.patternTracker.caseSensitive = 'false';
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
    this.patternTracker.startsWith = pattern;
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
    this.patternTracker.endsWith = pattern;
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
    this.patternTracker.expressions.push({ pattern });
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
    const pattern = '\\w+';
    return this.then(pattern);
  }

  /**
   * Matches an upper case letter
   */
  uppercaseLetter() {
    const pattern = '[A-Z]';
    return this.then(pattern);
  }

  /**
   * Matches lower case letter
   */
  lowercaseLetter() {
    const pattern = '[a-z]';
    return this.then(pattern);
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
    const pattern = `[${fromChar}-${toChar}]`;
    return this.then(pattern);
  }

  /**
   * Makes sure the previous pattern is followed by the given pattern
   *
   * @param {string} pattern the pattern to match
   */
  mustBeFollowedBy(pattern) {
    return this.then(`(?=${pattern})`);
  }

  /**
   * Makes sure the previous pattern is not followed by the given pattern
   *
   * @param {string} pattern the pattern to match
   */
  mustNotBeFollowedBy(pattern) {
    return this.then(`(?!${pattern})`);
  }

  /**
   * Adds an array of patterns as an or condition to the regex
   *
   * @param {Array[string]} patterns an array of strings that should be joined as an or condition
   * @returns RegexBuilder - this instance
   */
  canMatch(patterns) {
    return this.then(`(?:${patterns.join('|')})`);
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
    return this.then(`[^${values.join('')}]`);
  }

  /**
   * Adds an or condition to the regex
   *
   * @param {string} pattern the pattern to add as an or condition to the regex
   * @returns RegexBuilder - this instance
   */
  or(pattern) {
    return this.then(`|${pattern}`);
  }

  /**
   * Matches a number once
   *
   * @param {number} number the number to match
   * @returns RegexBuilder - this instance
   */
  number() {
    const pattern = '\\d';
    return this.then(pattern);
  }

  /**
   * Matches a number or or more times
   */
  numbers() {
    const pattern = '\\d+';
    return this.then(pattern);
  }

  /**
   * Matches a single space
   */
  space() {
    const pattern = ' ';
    return this.then(pattern);
  }

  /**
   * Matches a single whitespace
   */
  whitespace() {
    const pattern = '\\s';
    return this.then(pattern);
  }

  /**
   * Matches a single tab
   */
  tab() {
    const pattern = '\\t';
    return this.then(pattern);
  }

  /**
   * Matches a new line or line break
   */
  newLine() {
    const pattern = '(?:\\r\\n|\\r|\\n)';
    return this.then(pattern);
  }

  /**
   * Matches a pattern a specified number of times
   *
   * @param {number} nTimes the amount of times to match the pattern
   * @returns RegexBuilder - this instance
   */
  exactlyNTimes(nTimes) {
    const pattern = `{${nTimes}}`;
    return this.then(pattern);
  }

  /**
   * Adds a pattern to the regex which should be repeated a given number of times
   *
   * @param {string} pattern the pattern to repeat
   * @param {number} numberOfRepeats the number of times to repeat the pattern
   */
  repeat(pattern, numberOfRepeats) {
    return this.then(`(?:${pattern}){${numberOfRepeats}}`);
  }

  /**
   * Adds a rule to match the current pattern one or more times
   *
   * @returns RegexBuilder - this instance
   */
  oneOrMoreTimes() {
    const pattern = '+';
    return this.then(pattern);
  }

  /**
   * Adds a rule to match the current pattern zero or more times
   *
   * @returns RegexBuilder - this instance
   */
  zeroOrMoreTimes() {
    const pattern = '*';
    return this.then(pattern);
  }

  /**
   * Makes a pattern optional
   *
   * @param {string} pattern the patten to make optional
   * @returns RegexBuilder - this instance
   */
  optional(pattern) {
    return this.then(`(?:${pattern})?`);
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
    const pattern = '.';
    return this.then(pattern);
  }

  /**
   * Wraps the pattern in a capture group
   *
   * @param {string} pattern the pattern to match
   * @returns RegexBuilder - this instance
   */
  group(pattern) {
    return this.then(`(${pattern})`);
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

  toJson() {
    return JSON.stringify(this.patternTracker, null, 2);
  }

  static fromJson(json) {
    const obj = JSON.parse(json);
    let r = new RegexBuilder();
    if (obj.startsWith) {
      r = r.startsWith(obj.startsWith);
    }
    if (obj.caseSensitive) {
      r = r.caseSensitive(true);
    } else {
      r = r.caseSensitive(false);
    }
    obj.expressions.forEach((element) => {
      r.then(element.pattern);
    });
    if (obj.endsWith) {
      r = r.endsWith(obj.endsWith);
    }
    return r;
  }
};
