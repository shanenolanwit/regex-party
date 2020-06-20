// https://tc39.es/ecma262/#sec-date-objects

const simple = x => x + 1;
const complex = x => x + 2;

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
  // if only digits are given for the year, make the assumption wer are talking about 2000s
  const fixedYear = joined.replace(/^([0-9]{2})\b/g, '20$1');
  // make sure every entry has an offset with at least 3 digits followed by a z
  const updatedOffset = fixedYear.replace(/(\.([0-9]+)?Z?)$/g, '.000$2Z');
  // only include the last 3 digits of the offset
  const fixedOffset = updatedOffset.replace(/\.([0-9]+)([0-9]{3})Z$/, '.$2Z');
  return fixedOffset;
};

const extractDates = (text) => {
  // YYYY-MM-DDTHH:mm:ss.sssZ
  const regex = /\d{2,4}[-: ]\d{1,2}[-: ]\d{1,2}(\s|T)\s?\d{1,2}[-: ]\d{1,2}[-: ]\d{1,2}(\.\d{1,3}Z?)?/gi;
  const rawMatches = text.match(regex);
  const matches = rawMatches.map(x => transform(x));
  return matches;
};
module.exports = {
  simple,
  complex,
  extractDates
};
