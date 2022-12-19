import { cwd, chdir } from 'process';
import path from 'path';
import { readdir } from 'fs/promises';
import { access } from 'fs/promises';
import { ERROR_MESSAGE } from './messages.js';
import { throwOperationFailed } from './validation.js';
import { printCurrentDirectory } from './helpers.js';

export const up = () => {
  const currDir = cwd();

  if (path.basename(currDir)) {
    chdir('..');
  }
};

export const cd = async (pathName) => {
  console.log(pathName);
  try {
    await access(pathName);
  } catch (err) {
    throwOperationFailed();
  }
  chdir(pathName);
};

export const ls = async () => {
  const currDir = cwd();
  const fileArr = [];
  const dirArr = [];

  const files = await readdir(currDir, { withFileTypes: true });

  Promise.all(
    files.map(async (file) => {
      if (file.isDirectory()) {
        dirArr.push(file.name);
      } else if (file.isFile) {
        fileArr.push(file.name);
      }
    })
  )
    .then(() => {
      dirArr.sort((a, b) => a.localeCompare(b));
      fileArr.sort((a, b) => a.localeCompare(b));

      const dirInfoArr = dirArr.map((dir) => ({
        name: dir,
        type: 'directory'
      }));

      const fileInfoArr = fileArr.map((file) => ({ name: file, type: 'file' }));

      console.table([...dirInfoArr, ...fileInfoArr], ['name', 'type']);

      printCurrentDirectory();
    })
    .catch((err) => {
      console.log(ERROR_MESSAGE.operationFailed, err);
    });
};
