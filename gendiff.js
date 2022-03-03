#!/usr/bin/env node
import { Command } from 'commander';
import { genDiff } from './src/compareObjs.js';
import parseFormat from './src/parsers.js';
import formatObj from './formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((f1, f2, options) => {
    const firstFile = parseFormat(f1);
    const secondFile = parseFormat(f2);
    const diffObj = genDiff(firstFile, secondFile);

    formatObj(options.format, diffObj);
  });

program.parse();

export default genDiff;
