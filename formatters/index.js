import stylish from './stylish.js';
import { plain } from './plain.js';
import toJSON from './toJS.js';
import toJsAst from './toJsAST.js';

export default (format, obj) => {
  switch (format) {
    case 'plain':
      return plain(toJsAst(obj));
    case 'json':
      return toJSON(obj);
    case 'stylish':
    default:
      return stylish(toJsAst(obj), ' ', 2);
  }
};
