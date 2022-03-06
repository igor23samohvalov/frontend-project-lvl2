import _ from 'lodash';
import toJsAST from '../formatters/toJsAST.js';
import testObjs from '../__fixtures__/genDifftestplates.js';
import { getComparison } from '../src/getComparison.js';

test('toJsAST makes JS AST', () => {
  expect(toJsAST(getComparison(testObjs.file1, testObjs.file2))[0].state)
    .toBe('removed');
  expect(toJsAST())
    .toEqual([]);
  expect(_.has(toJsAST(getComparison(testObjs.file3, testObjs.file4))[0], 'children'))
    .toBeTruthy();
  expect(_.has(toJsAST(getComparison(testObjs.file1, testObjs.file2))[0], 'value'))
    .toBeTruthy();
});
