import { getComparison } from '../src/getComparison.js';
import stylish from '../formatters/stylish.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('stringify returns string object without quotes', () => {
  expect(typeof stylish(getComparison()))
    .toBe('string');
  expect(stylish(getComparison(testObjs.file1, testObjs.file2)))
    .not.toContain('"');
  expect(stylish(getComparison()))
    .toBe('{\n}');
});
