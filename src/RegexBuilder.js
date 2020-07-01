module.exports = class RegexBuilder {
  constructor({ flags = [] } = {}) {
    this.regexStr = '';
    this.flags = flags;
    this.startWith = false;
    this.endWith = false;
  }

  startsWith(pattern) {
    this.regexStr = `^${pattern}${this.regexStr}`;
    return this;
  }

  endsWith(pattern) {
    this.regexStr = `${this.regexStr}${pattern}$`;
    return this;
  }

  then(pattern) {
    this.regexStr += `${pattern}`;
    return this;
  }

  followedBy(pattern) {
    return this.then(pattern);
  }

  canMatch(patterns) {
    this.regexStr += patterns.join('|');
    return this;
  }

  or(pattern) {
    this.regexStr += `|${pattern}`;
    return this;
  }

  number(number) {
    this.regexStr += `${number}`;
    return this;
  }

  exactlyNTimes(nTimes) {
    this.regexStr += `{${nTimes}}`;
    return this;
  }

  oneOrMoreTimes() {
    this.regexStr += '+';
    return this;
  }

  zeroOrMoreTimes() {
    this.regexStr += '*';
    return this;
  }

  optional(pattern) {
    if (pattern.length > 1) {
      this.regexStr += `${this.group(pattern)}?`;
    } else {
      this.regexStr += `${pattern}?`;
    }
    return this;
  }

  maybe(pattern) {
    return this.optional(pattern);
  }

  anything() {
    this.regexStr += '.';
    return this;
  }

  group(pattern) {
    this.regexStr += `(${pattern})`;
    return this;
  }

  build() {
    const regex = this.asString();
    if (this.flags.length > 0) {
      return new RegExp(regex, this.flags.join(''));
    }
    return new RegExp(regex);
  }

  asString() {
    return this.regexStr;
  }
};
