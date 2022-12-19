import path from 'path';
import { EOL } from 'os';
import * as msg from './messages.js';
import { isEmpty } from './validation.js';

export const getArgv = (data) => data.toString().replace(EOL, '').split(' ');
//return params.filter(param => param.startsWith('--') && param.length > 2).map(param => param.slice(2));

export const printCurrentDirectory = () => {
  const currDir = process.cwd();
  console.log(`${msg.CURR_DIRECTORY} ${currDir}\r\n`);
};

export const getAbsolutePath = (pathValue) => {
  const currDir = process.cwd();

  if (isEmpty(pathValue)) {
    return currDir;
  }

  const endedPath =
    pathValue.endsWith(':')
      ? pathValue + '\\'
      : pathValue;

  return path.isAbsolute(endedPath) ? endedPath : path.join(currDir, endedPath);
};

const isUserNameNotCorrect = (userNameArg) =>
  userNameArg[0] !== '--username' || userNameArg[1].length < 1;

export const getUserNameFromArgs = () => {
  const args = process.argv.slice(2);

  const userNameArg = args[0].split('=');

  if (isUserNameNotCorrect(userNameArg)) {
    throw new Error(
      `${msg.ERROR_MESSAGE.invalidInput}. ${msg.ERROR_MESSAGE.userNameRequired}`
    );
  }

  return userNameArg[1];
};

export const welcomeUser = (userName) => {
  console.log(`${msg.WELCOME} ${userName}!\r\n`);
};
