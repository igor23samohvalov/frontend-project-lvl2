import { genDiff } from '../src/compareObjs.js';
import toJSON from '../formatters/toJS.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('toJSON returns string object with quotes', () => {
  expect(typeof toJSON(genDiff()))
    .toBe('string');
  expect(toJSON(genDiff(testObjs.file1, testObjs.file2)))
    .toContain('"');
  expect(toJSON(genDiff()))
    .toBe('{}');
});
