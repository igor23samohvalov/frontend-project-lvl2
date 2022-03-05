import _ from 'lodash';
import { isObject } from '../src/getComparison.js';

function parseValue(value) {
  if (value === null) {
    return null;
  }
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
}

function getDiffStatement(diff, path, newValue, oldValue) {
  const newOldValue = parseValue(oldValue);
  const newNewValue = parseValue(newValue);
  const newPath = path.startsWith('.')
    ? path.slice(1)
    : path;

  switch (diff) {
    case '+ ':
      return [`Property '${newPath}' was added with value: ${newNewValue}`];
    case '- ':
      return [`Property '${newPath}' was removed`];
    case '-+':
    default:
      return [`Property '${newPath}' was updated. From ${newOldValue} to ${newNewValue}`];
  }
}

function whatChanged(key = ' ') {
  switch (key.slice(0, 2)) {
    case '+ ':
      return 'added';
    case '- ':
      return 'removed';
    case '  ':
    default:
      return 'unchanged';
  }
}

function plain(data = {}, path = '') {
  const result = Object.entries(data).reduce((acc, [key, value]) => {
    if (whatChanged(key) === 'unchanged' && isObject(value)) {
      acc.push(plain(value, `${path}.${key.slice(2)}`));
    } else if (whatChanged(key) === 'removed' && !_.has(data, `+ ${key.slice(2)}`)) {
      acc.push(getDiffStatement('- ', `${path}.${key.slice(2)}`));
    } else if (whatChanged(key) === 'added' && _.has(data, `- ${key.slice(2)}`)) {
      acc.push(getDiffStatement('-+', `${path}.${key.slice(2)}`, value, data[`- ${key.slice(2)}`]));
    } else if (whatChanged(key) === 'added' && !_.has(data, `- ${key.slice(2)}`)) {
      acc.push(getDiffStatement('+ ', `${path}.${key.slice(2)}`, value));
    }

    return acc;
  }, []);

  return result.join('\n');
}

export {
  plain,
  whatChanged,
  getDiffStatement,
  parseValue,
};
