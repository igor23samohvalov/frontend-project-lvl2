import makeTree from './makeTree.js';
import stylish from './stylish.js';
import { plain } from './plain.js';
import toJSON from './toJS.js';

export default (format, obj) => {
  switch (format) {
    case 'makeTree':
      console.dir(makeTree(obj), { depth: null });
      break;
    case 'plain':
      console.log(plain(obj));
      break;
    case 'json':
      console.log(toJSON(obj));
      break;
    case 'stylish':
    default:
      console.log(stylish(obj, ' ', 2));
      break;
  }
};
