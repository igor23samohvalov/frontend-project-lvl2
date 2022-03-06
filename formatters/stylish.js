import _ from 'lodash';

function getState(state) {
  switch (state) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'unchanged':
    default:
      return '  ';
  }
}

function stylish(data, prefix = ' ', repeats = 2) {
  const result = data.map((node) => {
    if (_.has(node, 'value')) {
      return [`${prefix.repeat(repeats)}${getState(node.state)}${node.name}: ${node.value}`];
    }
    return [`${prefix.repeat(repeats)}${getState(node.state)}${node.name}: ${stylish(node.children, ' ', repeats + 4)}`];
  });

  return `{\n${result.join('\n')}\n${prefix.repeat(repeats - 2)}}`;
}

export default stylish;
