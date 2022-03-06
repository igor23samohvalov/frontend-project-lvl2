import _ from 'lodash';

function hasOpposite(nodes, node) {
  if (nodes.filter((elem) => elem.name === node.name).length > 1) {
    return true;
  }
  return false;
}

function parseValue(data) {
  if (data === undefined || data.value === null) {
    return null;
  }
  if (_.has(data, 'children')) {
    return '[complex value]';
  }
  if (typeof data.value === 'string') {
    return `'${data.value}'`;
  }
  return data.value;
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

function plain(data = [], path = '') {
  const result = data.flatMap((node, i) => {
    if (_.has(node, 'value') && node.state === 'unchanged') {
      return [];
    }
    if (_.has(node, 'value') && node.state === 'added' && hasOpposite(data, node)) {
      return [];
    }
    if (_.has(node, 'children') && node.state === 'added' && hasOpposite(data, node)) {
      return [];
    }
    if (_.has(node, 'value') && node.state === 'removed' && hasOpposite(data, node)) {
      return getDiffStatement('-+', `${path}.${node.name}`, data[i + 1], node);
    }
    if (_.has(node, 'children') && node.state === 'removed' && hasOpposite(data, node)) {
      return getDiffStatement('-+', `${path}.${node.name}`, data[i + 1], node);
    }
    if (node.state === 'added') {
      return getDiffStatement('+ ', `${path}.${node.name}`, node);
    }
    if (node.state === 'removed') {
      return getDiffStatement('- ', `${path}.${node.name}`, node);
    }
    if (_.has(node, 'children') && node.state === 'unchanged') {
      return plain(node.children, `${path}.${node.name}`);
    }
    return [];
  });

  return result.join('\n');
}

export {
  plain,
  whatChanged,
  getDiffStatement,
  parseValue,
};
