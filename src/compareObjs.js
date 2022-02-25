import _ from 'lodash';

function genDiff(file1 = {}, file2 = {}) {
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

export default genDiff;
