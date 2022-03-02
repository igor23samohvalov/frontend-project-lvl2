import { genDiff } from '../src/compareObjs.js';
import stringify from '../formatters/stringify.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('stringify returns string object without quotes', () => {
  expect(typeof stringify(genDiff()))
    .toBe('string');
  expect(stringify(genDiff(testObjs.file1, testObjs.file2)))
    .not.toContain('"');
  expect(stringify(genDiff()))
    .toBe('{}');
});
