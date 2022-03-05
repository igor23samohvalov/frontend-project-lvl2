import _ from 'lodash';
import makeTree from '../formatters/makeTree.js';
import testObjs from '../__fixtures__/genDifftestplates.js';
import { getComparison } from '../src/getComparison.js';

test('makeTree makes JS AST', () => {
  expect(makeTree(getComparison(testObjs.file1, testObjs.file2))[0].changes)
    .toBe('removed');
  expect(makeTree())
    .toEqual([]);
  expect(_.has(makeTree(getComparison(testObjs.file3, testObjs.file4))[0], 'children'))
    .toBeTruthy();
  expect(_.has(makeTree(getComparison(testObjs.file1, testObjs.file2))[0], 'value'))
    .toBeTruthy();
});
