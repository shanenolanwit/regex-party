const assert = require('assert');

const { extractDates } = require('../src/DateParty');

describe('test date utility methods', () => {
  it('Should extract strings resembling dates and convert them to actual dates', () => {
    const text = `start
      1999-8-28T10:20:4.20Z
      1999-04-21T22:4:6.20
      1999-07-13 11:12:9.201Z
      middle
      04 05 26 10-11-4.30Z
      10 08 28 08-10-4
      end`;
    const expectedDates = [
      new Date('1999-08-28T10:20:04.020Z'),
      new Date('1999-04-21T22:04:06.020Z'),
      new Date('1999-07-13T11:12:09.201Z'),
      new Date('2004-05-26T10:11:04.030Z'),
      new Date('2010-08-28T08:10:04.000Z')
    ];
    const expectedRawMatches = [
      '1999-8-28T10:20:4.20Z',
      '1999-04-21T22:4:6.20',
      '1999-07-13 11:12:9.201Z',
      '04 05 26 10-11-4.30Z',
      '10 08 28 08-10-4'
    ];
    const { rawMatches, extractedDates } = extractDates(text);
    assert.deepEqual(extractedDates, expectedDates);
    assert.deepEqual(rawMatches, expectedRawMatches);
    assert(true);
  });
});
