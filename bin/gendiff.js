import { getComparison } from '../src/getComparison.js';
import parseFormat from '../src/parsers.js';
import getFormattedObj from '../formatters/index.js';

function genDiff(file1, file2, format) {
  const obj1 = parseFormat(file1);
  const obj2 = parseFormat(file2);
  const objDiff = getComparison(obj1, obj2);

  return console.log(getFormattedObj(format, objDiff));
}

export default genDiff;
