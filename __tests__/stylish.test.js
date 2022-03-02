import _ from 'lodash';
import stylish from '../formatters/stylish.js';
import testObjs from '../__fixtures__/genDifftestplates.js';
import { genDiff } from '../src/compareObjs.js';

test('stylish makes JS AST', () => {
  expect(stylish(genDiff(testObjs.file1, testObjs.file2))[0].changes)
    .toBe('removed');
  expect(stylish())
    .toEqual([]);
  expect(_.has(stylish(genDiff(testObjs.file3, testObjs.file4))[0], 'children'))
    .toBeTruthy();
  expect(_.has(stylish(genDiff(testObjs.file1, testObjs.file2))[0], 'value'))
    .toBeTruthy();
});
