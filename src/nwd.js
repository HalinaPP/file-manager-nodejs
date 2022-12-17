import { cwd, chdir } from 'process';
import path from 'path';
import { readdir, stat } from 'fs/promises';
import { isNotEmpty } from './validation.js';
import { access } from 'fs/promises';
import { ERROR_MESSAGE } from './messages.js';


export const up = () => {
  const currDir = cwd();

  if (path.basename(currDir)) {
    chdir('../');
  }
}

export const cd = async (pathName) => {
  if (isNotEmpty(pathName)) {
    console.log(pathName);
    try {
      await access(pathName);
    } catch (err) {
      throw new Error(ERROR_MESSAGE.operationFailed);
    }
    chdir(pathName);
  }
}

export const ls = async () => {
  const currDir = cwd();
  const fileArr = [];
  const dirArr = [];

  //  try {
  const files = await readdir(currDir, { withFileTypes: true });
  /* } catch (error) {
     console.log(error.message);
   }*/

  Promise.all(files.map(async (file) => {
    if (file.isDirectory()) {
      dirArr.push(file.name);
    } else if (file.isFile) {
      fileArr.push(file.name);
    }

  })).then(() => {
    dirArr.sort((a, b) => a.localeCompare(b));
    fileArr.sort((a, b) => a.localeCompare(b));
    //console.log('dir=', dirArr);
    //console.log('file=', fileArr);
    console.log('end');

    const dirInfoArr = dirArr.map(dir => ({ name: dir, type: 'directory' }));
    const fileInfoArr = fileArr.map(file => ({ name: file, type: 'file' }));

    console.table([...dirInfoArr, ...fileInfoArr], ['name', 'type']);
  })
    .catch(err => { console.log(ERROR_MESSAGE.operationFailed, err) })

}
