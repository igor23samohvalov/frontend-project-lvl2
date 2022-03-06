import {
  plain,
  whatChanged,
  getDiffStatement,
  parseValue,
} from '../formatters/plain.js';
import testObjs from '../__fixtures__/genDifftestplates.js';
import toJsAST from '../formatters/toJsAST.js';
import { getComparison } from '../src/getComparison.js';

test('plain return string', () => {
  expect(typeof plain(toJsAST(getComparison(testObjs.file1, testObjs.file2))))
    .toBe('string');
});

test('getDiffStatement returns notes', () => {
  expect(getDiffStatement('-+', '.path', { children: [1] }, { value: 2 }))
    .toEqual(["Property 'path' was updated. From 2 to [complex value]"]);
});

test('whatChanged reacts to sign', () => {
  expect(whatChanged('+ w/e'))
    .toBe('added');
  expect(whatChanged())
    .toBe('unchanged');
});

test('parseValue converts value to a specified string', () => {
  expect(parseValue({ value: null }))
    .not.toBe('[complex value]');
  expect(parseValue({ value: 'some string' }))
    .toContain('');
});
