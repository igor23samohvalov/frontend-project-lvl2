#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './bin/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((f1, f2, options) => {
    genDiff(f1, f2, options.format);
  });

program.parse();
