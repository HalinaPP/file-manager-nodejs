import { homedir, EOL } from 'os';
import { argv, stdin, stdout, cwd, chdir } from 'process';
import path from 'path';
import { up, cd, ls } from './nwd.js';
import { isEmpty } from './validation.js';
import * as msg from './messages.js';


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

      console.log('comand=', command);
      const commandName = command[0];
      const currDir = cwd();
      try {
        switch (commandName) {
          case '.exit':
            exit(userName);
            break;
          case 'up':
            up();
            break;
          case 'cd':
            if (isEmpty(command[1])) {
              throw new Error(msg.ERROR_MESSAGE.invalidInput);
            }

            await cd(command[1]);
            break;
          case 'ls':
            await ls();
            break;
          case 'cat':
            read(command_param);
            break;
          case 'add':
            create();
            break;
          case 'rn':
            const source = command[1];
            const dest = command[2];

            rename(command_param,);
            break;
          case 'cp':
            copy();
            break;
          case 'mv':
            move();
            break;
          case 'rm':
            remove();
            break;
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
