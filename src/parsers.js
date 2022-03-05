import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import yaml from 'js-yaml';

function parseFormat(file = '.') {
  const fileFormat = file.split('.')[1];

  switch (fileFormat) {
    case 'json':
      return JSON.parse(fs.readFileSync(path.resolve(cwd(), file)));
    case 'yml':
    case 'yaml':
      return yaml.load(fs.readFileSync(path.resolve(cwd(), file)));
    default:
      return console.log(`${fileFormat} is not supported.`);
  }
}

export default parseFormat;
