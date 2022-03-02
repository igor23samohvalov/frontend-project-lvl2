import path from 'path';
import { fileURLToPath } from 'url';
import parseFormat from '../src/parsers.js';
import testObjs from '../__fixtures__/genDifftestplates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('parsing', () => {
  expect(parseFormat()).toBeUndefined();
  expect(parseFormat(path.join(__dirname, '../__fixtures__/file1.yml')))
    .toEqual(testObjs.file1);
  expect(parseFormat(path.join(__dirname, '../__fixtures__/file1.json')))
    .toEqual(testObjs.file1);
});
