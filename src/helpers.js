import { EOL } from 'os';
import * as msg from './messages.js';

export const getArgv = (data) => data.toString().replace(EOL, '').split(' ');

export const printCurrentDirectory = () => {
  const currDir = process.cwd();
  console.log(`${msg.CURR_DIRECTORY} ${currDir}\r\n`);
};

export const createCopyFileName = (name, ext) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${name}-Copy-${randomNumber}${ext}`;
}

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
