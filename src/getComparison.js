import _ from 'lodash';

const isObject = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    return true;
  }

  return false;
};

function getComparison(file1 = {}, file2 = {}) {
  const file2Data = Object.entries(file2);
  const file1Data = Object.entries(file1);
  const result = [];

  file1Data.forEach(([key, value]) => {
    if (!_.has(file2, key)) {
      if (isObject(value)) {
        result.push([`- ${key}`, getComparison(value, value)]);
      } else {
        result.push([`- ${key}`, value]);
      }
    }
  });

  file2Data.forEach(([key, value]) => {
    if (!_.has(file1, key)) {
      if (isObject(value)) {
        result.push([`+ ${key}`, getComparison(value, value)]);
      } else {
        result.push([`+ ${key}`, value]);
      }
    } else if (isObject(value) && !isObject(file1[key])) {
      result.push([`- ${key}`, file1[key]]);
      result.push([`+ ${key}`, getComparison(value, value)]);
    } else if (!isObject(value) && isObject(file1[key])) {
      result.push([`- ${key}`, getComparison(file1[key], file1[key])]);
      result.push([`+ ${key}`, value]);
    } else if (isObject(value) && isObject(file1[key])) {
      result.push([`  ${key}`, getComparison(file1[key], value)]);
    } else if (value === file1[key]) {
      result.push([`  ${key}`, value]);
    } else {
      result.push([`- ${key}`, file1[key]]);
      result.push([`+ ${key}`, value]);
    }
  });

  const sortedResult = Object.fromEntries(_.sortBy(result, (item) => item[0].slice(2)));

  return sortedResult;
}

export { getComparison, isObject };
