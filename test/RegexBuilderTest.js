const assert = require('assert');

const RegexBuilder = require('../src/RegexBuilder');

describe('Unit: RegexBuilder', () => {
  it('should be possible to build a regex with a then', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello world').toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello world');
    assert(regex.exec('hello world'), 'should have matched');
  });

  it('should be possible to build a regex with a number passed as a string', () => {
    const builder = new RegexBuilder();
    const regex = builder.number('1').toRegExp();
    assert.strictEqual(builder.toRegexString(), '\\d');
    assert(regex.exec('1'), 'should have matched');
  });

  it('should be possible to build a regex with a number passed as a number', () => {
    const builder = new RegexBuilder();
    const regex = builder.number(1).toRegExp();
    assert.strictEqual(builder.toRegexString(), '\\d');
    assert(regex.exec('1'), 'should have matched');
  });

  it('should be possible to build a regex with a pattern exactly n times', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('a').exactlyNTimes(2).toRegExp();
    assert.strictEqual(builder.toRegexString(), 'a{2}');
    assert('aa'.match(regex), 'should have matched');
  });

  it('should not match a string which does not contain a given exactly n times', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('a').exactlyNTimes(2).toRegExp();
    assert.strictEqual(builder.toRegexString(), 'a{2}');
    assert(!'a'.match(regex), 'should not have matched');
  });

  it('should be possible to build a regex to match a pattern one ore more times', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('a').oneOrMoreTimes().toRegExp();
    assert.strictEqual(builder.toRegexString(), 'a+');
    assert('aaaaaaaaa'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex to match a pattern zero ore more times', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('a').zeroOrMoreTimes().toRegExp();
    assert.strictEqual(builder.toRegexString(), 'a*');
    assert(''.match(regex), 'should have matched');
  });

  it('should be possible to build a regex with "or" syntax from an array of strings', () => {
    const builder = new RegexBuilder();
    const regex = builder.canMatch(['http', 'https'])
      .anything()
      .zeroOrMoreTimes()
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:http|https).*');
    assert('http://'.match(regex), 'should have matched');
    assert('https://'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex with OR syntax from a pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder.startsWith('hello').then(' world').or('there');
    assert.strictEqual(builder.toRegexString(), '^hello world|there');
    assert('hello world'.match(regex), 'should have matched');
    assert('hello there'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that matches anything', () => {
    const builder = new RegexBuilder();
    const regex = builder.anything()
      .zeroOrMoreTimes()
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '.*');
    assert('some-string'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that starts with a pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder.startsWith('hello')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '^hello');
    assert('hello world'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that ends with a pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder.endsWith('world')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'world$');
    assert('hello world'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that contains an optional with more than 1 character in the pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder
      .optional('hello')
      .then('world')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:hello)?world');
    assert('hello world'.match(regex), 'should have matched');
    assert('world'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that contains an optional with less than 1 character in the pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder
      .optional('1')
      .then('world')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:1)?world');
    assert('1world'.match(regex), 'should have matched');
    assert('world'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that contains an optional using the "maybe" function', () => {
    const builder = new RegexBuilder();
    const regex = builder
      .maybe('1')
      .then('world')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:1)?world');
    assert('1world'.match(regex), 'should have matched');
    assert('world'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that contains flags', () => {
    const builder = new RegexBuilder({ flags: ['g', 'i'] });
    const regex = builder
      .then('hello')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello');
    assert.strictEqual(regex.flags, 'gi');
  });

  it('should be possible to build a regex with a capture group', () => {
    const builder = new RegexBuilder();
    const groupRegex = new RegexBuilder().then('world').toRegexString();
    const regex = builder
      .then('hello ')
      .group(groupRegex)
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello (world)');
    const match = 'hello world'.match(regex);
    assert.strictEqual(match[1], 'world');
  });

  it('should be possible to build a regex that is not case sensitive', () => {
    const builder = new RegexBuilder();
    const regex = builder
      .optional('1')
      .then('woRLd')
      .caseSensitive(false)
      .toRegExp();
    assert('1world'.match(/1WORld/i), 'should have matched');
    assert.strictEqual(builder.toRegexString(), '(?:1)?woRLd');
    assert('1world'.match(regex), 'should have matched');
    assert('WOrld'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that matches anything but the given values', () => {
    const builder = new RegexBuilder();
    const regex = builder.anythingBut(['a', 'b', 'c'])
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '[^abc]');
    assert(!'abc'.match(regex), 'should not have matched');
    assert('def'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that matches a pattern not followed by another pattern', () => {
    const builder = new RegexBuilder();
    const regex = builder.startsWith('abc').mustNotBeFollowedBy('def')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '^abc(?!def)');
    assert(!'abcdef'.match(regex), 'should not have matched');
    assert('abc'.match(regex), 'should have matched');
    assert('abc-some-other-pattern'.match(regex), 'should have matched');
  });

  it('should be possible to build a regex that matches a word', () => {
    const builder = new RegexBuilder();
    const regex = builder.word()
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '\\w+');
    assert(!'*'.match(regex), 'should not have matched');
    assert('hello'.match(regex), 'should have matched');
    assert('abc-some-other-pattern'.match(regex), 'should have matched');
  });

  it('should be possible to repeat a pattern a given number of times', () => {
    const builder = new RegexBuilder();
    const regex = builder.repeat('hello', 3)
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:hello){3}');
    assert('hellohellohello'.match(regex), 'should have matched');
    assert(!'hello'.match(regex), 'should have matched');
    assert(!'hellohello'.match(regex), 'should not have matched');
  });

  it('should be possible to generate a regex with an OR condition using "eitherOf"', () => {
    const builder = new RegexBuilder();
    const regex = builder.eitherOf(['hello', 'world'])
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), '(?:hello|world)');
    assert('hello'.match(regex), 'should have matched');
    assert('world'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex with a positive look ahead', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello').space().mustBeFollowedBy('something')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello (?=something)');
    assert('hello something'.match(regex), 'should have matched');
    assert(!'hello'.match(regex), 'should not have matched');
  });

  it('should be possible to generate a regex with a space', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello').space().then('something')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello something');
    assert('hello something'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex that can match a single whitespace', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello').whitespace().then('something')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello\\ssomething');
    assert('hello\tsomething'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex that can match a single tab', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello').tab().then('something')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello\\tsomething');
    assert('hello\tsomething'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex that can match a new line', () => {
    const builder = new RegexBuilder();
    const regex = builder.then('hello').newLine().then('something')
      .toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello(?:\\r\\n|\\r|\\n)something');
    assert('hello\nsomething'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex that can match an uppercase letter', () => {
    const builder = new RegexBuilder();
    const regex = builder.uppercaseLetter().toRegExp();
    assert.strictEqual(builder.toRegexString(), '[A-Z]');
    assert('H'.match(regex), 'should have matched');
    assert(!'h'.match(regex), 'should not have matched');
  });

  it('should be possible to generate a regex that can match a lowercase letter', () => {
    const builder = new RegexBuilder();
    const regex = builder.lowercaseLetter().toRegExp();
    assert.strictEqual(builder.toRegexString(), '[a-z]');
    assert('h'.match(regex), 'should have matched');
    assert(!'H'.match(regex), 'should not have matched');
  });

  it('should be possible to generate a regex using "followedBy"', () => {
    const builder = new RegexBuilder();
    const regex = builder.match('hello').space().followedBy('world').toRegExp();
    assert.strictEqual(builder.toRegexString(), 'hello world');
    assert('hello world'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex to match multiple numbers', () => {
    const builder = new RegexBuilder();
    const regex = builder.numbers().toRegExp();
    assert.strictEqual(builder.toRegexString(), '\\d+');
    assert('1'.match(regex), 'should have matched');
    assert('1234'.match(regex), 'should have matched');
  });

  it('should be possible to generate a regex to match a character range', () => {
    const builder = new RegexBuilder();
    const regex = builder.characterRange('a', 'd').toRegExp();
    assert.strictEqual(builder.toRegexString(), '[a-d]');
    assert('a'.match(regex), 'should have matched');
    assert('b'.match(regex), 'should have matched');
    assert('c'.match(regex), 'should have matched');
    assert('d'.match(regex), 'should have matched');
    assert(!'e'.match(regex), 'should not have matched');
  });

  it('should throw an error if the starting character is larger than the ending character in a character range', () => {
    const builder = new RegexBuilder();
    assert.throws(() => builder.characterRange('d', 'a'), {
      name: 'Error',
      message: 'Start of character range'
      + ' is greater than the end character, make sure both characters are the same casing.'
    });
  });

  it('should throw an error if the the characters for a character range are different casings', () => {
    const builder = new RegexBuilder();
    assert.throws(() => builder.characterRange('a', 'B'), {
      name: 'Error',
      message: 'Start of character range'
      + ' is greater than the end character, make sure both characters are the same casing.'
    });
  });

  it.only('should', () => {
    const builder = new RegexBuilder();
    const r = builder.then('mployee').then('[0-9]+').optional('X').characterRange('a', 'f')
      .startsWith('E')
      .endsWith('[0-9]')
      .caseSensitive(true);
    console.log(r.toJson());
    const regex = RegexBuilder.fromJson(r.toJson()).toRegexString();
    assert('Employee4a3'.match(regex), 'should have matched');
    assert('Employee2Xf1'.match(regex), 'should have matched');
    assert(!'employee4a3'.match(regex), 'should not have matched');
    assert(!'Employee4k3'.match(regex), 'should not have matched');
  });
});
