import _ from 'lodash';

const isObject = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    return true;
  }

  return false;
};

function genDiff(file1 = {}, file2 = {}) {
  const file2Data = Object.entries(file2);
  const file1Data = Object.entries(file1);
  let result = [];

  file1Data.forEach(([key, value]) => {
    if (!_.has(file2, key)) {
      if (isObject(value)) {
        result.push([`- ${key}`, genDiff(value, value)]);
      } else {
        result.push([`- ${key}`, value]);
      }
    }
  });

  file2Data.forEach(([key, value]) => {
    if (!_.has(file1, key)) {
      if (isObject(value)) {
        result.push([`+ ${key}`, genDiff(value, value)]);
      } else {
        result.push([`+ ${key}`, value]);
      }
    } else if (isObject(value) && !isObject(file1[key])) {
      result.push([`- ${key}`, file1[key]]);
      result.push([`+ ${key}`, genDiff(value, value)]);
    } else if (!isObject(value) && isObject(file1[key])) {
      result.push([`- ${key}`, genDiff(file1[key], file1[key])]);
      result.push([`+ ${key}`, value]);
    } else if (isObject(value) && isObject(file1[key])) {
      result.push([`  ${key}`, genDiff(file1[key], value)]);
    } else if (value === file1[key]) {
      result.push([`  ${key}`, value]);
    } else {
      result.push([`- ${key}`, file1[key]]);
      result.push([`+ ${key}`, value]);
    }
  });

  result = Object.fromEntries(_.sortBy(result, (item) => item[0].slice(2)));

  return result;
}

export { genDiff, isObject };
