import { isObject } from '../src/compareObjs.js';

function recourseObj(data, sign, repeats, reps) {
  return Object.entries(data).reduce((prev, [key, value]) => {
    if (isObject(value)) {
      prev.push(`${sign.repeat(repeats)}${key}: ${[recourseObj(value, sign, repeats + reps, reps)]}`);
      prev.push((`${sign.repeat(repeats)}  }`));
    } else {
      prev.push(`${sign.repeat(repeats)}${key}: ${value}`);
    }

    return prev;
  }, ['{']).join('\n').replace(/['",]+/g, '');
}

function stringify(data, sign = ' ', repeats = 2) {
  switch (typeof data) {
    case 'boolean':
    case 'number':
    case 'string':
      return data.toString().replace(/['",]+/g, '');
    case 'object':
    default: {
      const reps = repeats + 2;
      const result = recourseObj(data, sign, repeats, reps);

      return `${result}\n}`;
    }
  }
}

export default stringify;
