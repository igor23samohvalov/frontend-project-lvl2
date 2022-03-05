import makeTree from './makeTree.js';
import stylish from './stylish.js';
import { plain } from './plain.js';
import toJSON from './toJS.js';

export default (format, obj) => {
  switch (format) {
    case 'makeTree':
      return makeTree(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return toJSON(obj);
    case 'stylish':
    default:
      return stylish(obj, ' ', 2);
  }
};
