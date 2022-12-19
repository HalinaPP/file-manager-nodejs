import { up, cd, ls } from './nwd.js';
import { calculateHash as hash } from './hash/calcHash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';
import { read, create, rename, remove, copy, move } from './fs/index.js';
import os from './os.js';
import { getAbsolutePath, printCurrentDirectory } from './helpers.js';
import { throwInvalidInput } from './validation.js';

export const resolveCommand = async (commandName, args) => {

  const source = getAbsolutePath(args[0] ?? '');
  const dest = getAbsolutePath(args[1] ?? '');

  console.log('comand=', commandName);
  try {
    switch (commandName) {
      case 'up':
        up();
        break;
      case 'cd':
        await cd(source);
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        await read(source);
        break;
      case 'add':
        await create(args[0]);
        break;
      case 'rn':
        await rename(source, args[1]);
        break;
      case 'cp':
        await copy(source, args[1]);
        break;
      case 'mv':
        await move(source, args[1]);
        break;
      case 'rm':
        await remove(source);
        break;
      case 'os':
        await os(args);
        break;
      case 'hash':
        await hash(source);
        break;
      case 'compress':
        await compress(source, dest);
        break;
      case 'decompress':
        await decompress(source, dest);
        break;
      default:
        throwInvalidInput();
    }

    printCurrentDirectory();
  } catch (err) {
    console.log(err.message);
  }
};
