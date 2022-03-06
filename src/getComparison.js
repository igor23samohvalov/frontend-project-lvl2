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

  const removedData = file1Data
    .filter(([key]) => !_.has(file2, key))
    .map(([key, value]) => {
      if (isObject(value)) {
        return [`- ${key}`, getComparison(value, value)];
      }
      return [`- ${key}`, value];
    });

  const addedData = file2Data
    .filter(([key]) => !_.has(file1, key))
    .map(([key, value]) => {
      if (isObject(value)) {
        return [`+ ${key}`, getComparison(value, value)];
      }
      return [`+ ${key}`, value];
    });

  const unchangedData = file2Data
    .filter(([key, value]) => file1[key] === value)
    .map(([key, value]) => {
      if (isObject(value)) {
        return [`  ${key}`, getComparison(value, value)];
      }
      return [`  ${key}`, value];
    });

  const updatedObjectData = file2Data
    .filter(([key, value]) => (_.has(file1, key) && file1[key] !== value))
    .flatMap(([key, value]) => {
      if (isObject(value) && isObject(file1[key])) {
        return [[`  ${key}`, getComparison(file1[key], value)]];
      }
      if (!isObject(value) && isObject(file1[key])) {
        return [[`- ${key}`, getComparison(file1[key], file1[key])], [`+ ${key}`, value]];
      }
      if (isObject(value) && !isObject(file1[key])) {
        return [[`- ${key}`, file1[key]], [`+ ${key}`, getComparison(value, value)]];
      }
      if (!isObject(value) && !isObject(file1[key])) {
        return [[`- ${key}`, file1[key]], [`+ ${key}`, value]];
      }
      return [];
    });

  const data = [
    ...removedData,
    ...addedData,
    ...unchangedData,
    ...updatedObjectData,
  ];

  const sortedResult = Object.fromEntries(_.sortBy(data, (item) => item[0].slice(2)));

  return sortedResult;
}

export { getComparison, isObject };
