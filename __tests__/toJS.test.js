import { getComparison } from '../src/getComparison.js';
import toJSON from '../formatters/toJS.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('toJSON returns string object with quotes', () => {
  expect(typeof toJSON(getComparison()))
    .toBe('string');
  expect(toJSON(getComparison(testObjs.file1, testObjs.file2)))
    .toContain('"');
  expect(toJSON(getComparison()))
    .toBe('{}');
});
