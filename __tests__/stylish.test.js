import { getComparison } from '../src/getComparison.js';
import stylish from '../formatters/stylish.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('stringify returns string object without quotes/comas', () => {
  expect(typeof stylish(getComparison()))
    .toBe('string');
  expect(stylish(getComparison(testObjs.file1, testObjs.file2)))
    .not.toContain('"');
  expect(stylish('place,"holder"'))
    .toBe('placeholder');
  expect(stylish(getComparison()))
    .toBe('{\n}');
  expect(stylish(testObjs.file3).endsWith('}'))
    .toBeTruthy();
  expect(stylish(5))
    .toBe('5');
  expect(stylish(false))
    .toBe('false');
});
