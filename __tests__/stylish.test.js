import { genDiff } from '../src/compareObjs.js';
import stylish from '../formatters/stylish.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('stringify returns string object without quotes', () => {
  expect(typeof stylish(genDiff()))
    .toBe('string');
  expect(stylish(genDiff(testObjs.file1, testObjs.file2)))
    .not.toContain('"');
  expect(stylish(genDiff()))
    .toBe('{\n}');
});
