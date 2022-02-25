#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './src/compareObjs.js';
import parseFormat from './src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((f1, f2, options) => {
    const firstFile = parseFormat(f1);
    const secondFile = parseFormat(f2);

    console.log(genDiff(firstFile, secondFile));

    if (options.format) {
      console.log(f1.split('.')[1]);
    }
  });

program.parse();

export default genDiff;
