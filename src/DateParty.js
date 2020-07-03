
const transform = (text) => {
  const capitals = text.toUpperCase().replace(/Z$/i, 'Z');
  const splits = capitals.split(/[-: T.]/g);
  splits.splice(1, 0, '-');
  splits.splice(3, 0, '-');
  splits.splice(5, 0, 'T');
  splits.splice(7, 0, ':');
  splits.splice(9, 0, ':');
  splits.splice(11, 0, '.');
  const joined = splits.join('');
  // if only digits are given for the year, make the assumption we are talking about 2000s
  const fixedYear = joined.replace(/^([0-9]{2})\b/g, '20$1');
  // make sure every entry has an offset with at least 3 digits followed by a z
  const updatedOffset = fixedYear.replace(/(\.([0-9]+)?Z?)$/g, '.000$2Z');
  // only include the last 3 digits of the offset
  const fixedOffset = updatedOffset.replace(/\.([0-9]+)([0-9]{3})Z$/, '.$2Z');
  // make sure all months, days, hours, minutes, seconds have two digits - prepend single digits with zero
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  // YYYY-MM-DDTHH:mm:ss.sssZ
  const fixedFigures = fixedOffset.replace(/\b([0-9])\b/g, '0$1');
  return fixedFigures;
};

/**
 * Given a block of text, extract strings which loosely match ecma compliant dates
 * https://tc39.es/ecma262/#sec-date-objects
 * Return the raw matches and their associated date objects
 * @param {*} text - string of text
 * @returns { rawMatches,extractedDates } - JS object with raw string matches and their respective Date objects
 */
const extractDates = (text) => {
  const regex = /\d{2,4}[-: ]\d{1,2}[-: ]\d{1,2}(\s|T)\s?\d{1,2}[-: ]\d{1,2}[-: ]\d{1,2}(\.\d{1,3}Z?)?/gi;
  const rawMatches = text.match(regex);
  const matches = rawMatches.map(x => transform(x));
  const extractedDates = matches.map(d => new Date(d));
  return {
    rawMatches,
    extractedDates
  };
};
module.exports = {
  extractDates
};
