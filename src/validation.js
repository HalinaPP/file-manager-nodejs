import { ERROR_MESSAGE } from './messages.js';
import { isExists, isDir, getAbsolutePath } from './fs-helpers.js';

export const isNotEmpty = (value) =>
  value !== undefined && value !== '' && value !== null;

export const isEmpty = (value) =>
  value === undefined || value === '' || Object.is(value, null);

export const validateDestDir = async (destDir) => {
  if (isEmpty(destDir)) {
    throwInvalidInput();
  }

  const destDirPath = getAbsolutePath(destDir);
  const isDestExists = await isExists(destDirPath);

  if (!isDestExists) {
    throwOperationFailed();
  }

  const isDestDir = await isDir(destDirPath);

  if (!isDestDir) {
    throwInvalidInput();
  }
};
export const throwOperationFailed = () => {
  throw new Error(ERROR_MESSAGE.operationFailed);
};

export const throwInvalidInput = () => {
  throw new Error(ERROR_MESSAGE.invalidInput);
};

export const throwFileExists = () => {
  console.log('File already exists.');
  throwOperationFailed();
};
