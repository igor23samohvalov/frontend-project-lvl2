import stringify from './stringify.js';
import stylish from './stylish.js';
import { plain } from './plain.js';
import toJSON from './toJS.js';

export default (format, obj) => {
  switch (format) {
    case 'stringify':
      console.log(stringify(obj));
      break;
    case 'plain':
      console.log(plain(obj));
      break;
    case 'json':
      console.log(toJSON(obj));
      break;
    case 'stylish':
    default:
      console.dir(stylish(obj), { depth: null });
      break;
  }
};
