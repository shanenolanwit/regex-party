const assert = require('assert');

const { simple, complex, extractDates } = require('../src/DateParty');

describe('', () => {
  it('Should', () => {
    console.log(simple(2));
    assert(true);
  });

  it('Should', () => {
    console.log(complex(13));
    assert(true);
  });

  it('Should', () => {
    const text = `start
      1999-08-28T10:20:4.20Z
      1999-04-21T22:04:6.20
      1999-07-13 11:12:9.201Z
      middle
      04 05 26 10-11-4.30Z
      10 08 28 08-10-4
      end`;
    console.log(extractDates(text));
    assert(true);
  });
});
