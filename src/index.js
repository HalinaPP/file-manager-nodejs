import { homedir } from 'os';
import { stdin, chdir } from 'process';
import * as msg from './messages.js';
import { printCurrentDirectory, getArgv, welcomeUser } from './helpers.js';
import { resolveCommand } from './map-command.js';

const run = async () => {
  try {
    chdir(homedir());
    welcomeUser();
    printCurrentDirectory();

    stdin.on('data', async (data) => {
      const argv = getArgv(data);
      const [commandName, ...args] = argv;

      if (commandName === '.exit') {
        exit(userName);
      }

      await resolveCommand(commandName, args);
    });

    process.on('SIGINT', () => {
      exit(userName);
    });

  } catch (error) {
    console.log(error.message ?? msg.ERROR_MESSAGE.operationFailed);
  }
};

const exit = (userName) => {
  console.log(`${msg.GOODBYE[0]} ${userName}${msg.GOODBYE[1]}`);
  process.exit();
};

await run();
