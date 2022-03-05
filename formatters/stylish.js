import { isObject } from '../src/compareObjs.js';

const signs = {
  '- ': 'removed',
  '+ ': 'added',
  '  ': 'unchanged',
};

function stylish(obj = {}) {
  return Object.entries(obj).map(([key, value]) => {
    if (isObject(value)) {
      return {
        name: key.slice(2),
        children: stylish(value),
        type: typeof value,
        changes: signs[key.slice(0, 2)],
      };
    }

    return {
      name: key.slice(2),
      value: obj[key],
      type: typeof value,
      changes: signs[key.slice(0, 2)],
    };
  });
}

export default stylish;
