import { getComparison, isObject } from '../src/getComparison.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('genDiff returns comparison', () => {
  expect(typeof getComparison(testObjs.file1, testObjs.file2))
    .toBe('object');
  expect(getComparison())
    .toEqual({});
  expect(isObject({}))
    .toBeTruthy();
  expect(Object.keys(getComparison(testObjs.file1, {})).map((el) => el.slice(0, 2)))
    .toContain('- ');
  expect(Object.keys(getComparison(testObjs.file5, testObjs.file6)).map((el) => el.slice(0, 2)))
    .toContain('+ ');
});
