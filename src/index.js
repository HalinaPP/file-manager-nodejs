import { homedir, EOL } from 'os';
import { argv, stdin, cwd, chdir } from 'process';
import path from 'path';
import { up, cd, ls } from './nwd.js';
import { isEmpty } from './validation.js';
import * as msg from './messages.js';
import { read, create, rename, remove, copy, move } from './fs/index.js';
import os from './os.js';
import { getArgv } from './helpers.js';


const run = async () => {
  try {
    const homeDir = homedir();

    chdir(homeDir);
    const currDirectory = cwd();
    console.log('arfs=', cwd());
    const args = argv.slice(2);
    const isCommandFormatCorrect =
      args[0] === '--' && args[1].startsWith('--') && args[1].length > 2;

    let userName;

    if (isCommandFormatCorrect) {
      userName = args[1].slice(2);
    } else {
      throw new Error(
        `${msg.ERROR_MESSAGE.invalidInput}. User name is required. Please run file manager using next command "npm run -- --userName"`
      );
    }

    console.log(`${msg.WELCOME} ${userName}!`);

    stdin.on('data', async (data) => {
      const command = data.toString().replace(EOL, '').split(' ');
      const command_param = command[1];

      const currDir = cwd();

      const source = path.join(currDir, command[1] ?? '');
      const dest = path.join(currDir, command[2] ?? '');

      console.log('comand=', command);
      const commandName = command[0];

      try {
        switch (commandName) {
          case '.exit':
            exit(userName);
            break;
          case 'up':
            up();
            break;
          case 'cd':
            if (isEmpty(source)) {
              throw new Error(msg.ERROR_MESSAGE.invalidInput);
            }

            await cd(source);
            break;
          case 'ls':
            await ls();
            break;
          case 'cat':
            await read(source);
            break;
          case 'add':
            await create(source);
            break;
          case 'rn':
            await rename(source, dest);
            break;
          case 'cp':
            await copy(source, dest);
            break;
          case 'mv':
            await move(source, dest);
            break;
          case 'rm':
            await remove(source);
            break;
          case 'os':
            const argv = getArgv(command);
            await os(argv);
          default:
            break;
        }

        console.log(`${msg.CURR_DIRECTORY} ${cwd()}`);
      } catch (err) {
        console.log(err);
      }
    });

    process.on('SIGINT', () => {
      exit(userName);
    });
  } catch (error) {
    console.log(error.message ?? msg.ERROR_MESSAGE.operationFailed);
  }
};

const exit = (userName) => {
  console.log(`${GOODBYE[0]} ${userName}${msg.GOODBYE[1]}`);
  process.exit();
};


await run();
