#!/usr/bin/env node
import { Command } from 'commander';
import _ from 'lodash';
import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';

const program = new Command();

function genDiff(file1, file2) {
  const file2Data = Object.entries(file2);
  const file1Data = Object.entries(file1);
  const result = [];

  file2Data.forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(file1, key)) {
      if (file1[key] === value) {
        result.push(`    ${key}: ${value}`);
      } else {
        result.push(`  - ${key}: ${file1[key]}`);
        result.push(`  + ${key}: ${value}`);
      }
    } else {
      result.push(`  + ${key}: ${value}`);
    }
  });

  file1Data.forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(file2, key)) {
      result.push((`  - ${key}: ${value}`));
    }
  });

  const sortedResult = _.sortBy(result, (item) => item.slice(4, 5));
  sortedResult.push('}');
  sortedResult.unshift('{');

  return sortedResult.join('\n');
}

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((f1, f2, options) => {
    const firstFile = JSON.parse(fs.readFileSync(path.resolve(cwd(), f1)));
    const secondFile = JSON.parse(fs.readFileSync(path.resolve(cwd(), f2)));

    console.log(genDiff(firstFile, secondFile));

    if (options.format) {
      console.log(f1.split('.')[1]);
    }
  });

program.parse();

export default genDiff;
