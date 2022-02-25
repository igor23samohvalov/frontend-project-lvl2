import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import yaml from 'js-yaml';

function parseFormat(file = '.') {
  const fileFormat = file.split('.')[1];
  let output;

  switch (fileFormat) {
    case 'json':
      output = JSON.parse(fs.readFileSync(path.resolve(cwd(), file)));
      break;
    case 'yml':
    case 'yaml':
      output = yaml.load(fs.readFileSync(path.resolve(cwd(), file)));
      break;
    default:
      return console.log(`${fileFormat} is not supported.`);
  }

  return output;
}

export default parseFormat;
