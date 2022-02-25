import genDiff from '../src/compareObjs.js';
import test1 from '../__fixtures__/genDifftestplates.js';

test('genDiff returns comparison', () => {
  expect(genDiff(test1.file1, test1.file2)).toEqual(test1.result);
  expect(genDiff()).toEqual('{\n}');
  expect(typeof genDiff()).toEqual('string');
});
