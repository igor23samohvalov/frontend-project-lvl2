import { getComparison } from '../src/getComparison.js';
import stylish from '../formatters/stylish.js';
import testObjs from '../__fixtures__/genDifftestplates.js';
import toJsAST from '../formatters/toJsAST.js';

test('stylish returns string object without quotes/comas', () => {
  // expect(typeof stylish(toJsAST(getComparison())))
  //   .toBe('string');
  expect(stylish(toJsAST(getComparison(testObjs.file3, testObjs.file4))))
    .not.toContain('"');
  expect(stylish(toJsAST(getComparison())))
    .toBe('{\n\n}');
});
