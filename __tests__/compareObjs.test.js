import { genDiff, isObject } from '../src/compareObjs.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

test('genDiff returns comparison', () => {
  expect(typeof genDiff(testObjs.file1, testObjs.file2))
    .toBe('object');
  expect(genDiff())
    .toEqual({});
  expect(isObject({}))
    .toBeTruthy();
  expect(Object.keys(genDiff(testObjs.file1, {})).map((el) => el.slice(0, 2)))
    .toContain('- ');
  expect(Object.keys(genDiff(testObjs.file5, testObjs.file6)).map((el) => el.slice(0, 2)))
    .toContain('+ ');
});
