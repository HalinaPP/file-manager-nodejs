import * as sOs from 'os';
import {
  throwOperationFailed,
  throwInvalidInput,
  isEmpty
} from './validation.js';

const os = async (args) => {
  if (isEmpty(args[0])) {
    throwInvalidInput();
  }

  if (!args[0].startsWith('--')) {
    throwOperationFailed();
  }

  const currArg = args[0].slice(2);

  switch (currArg) {
    case 'EOL':
      console.log(JSON.stringify(sOs.EOL));
      break;
    case 'architecture':
      console.log(sOs.arch());
      break;
    case 'cpus':
      const cpus = sOs.cpus().map((cpu) => cpu.model);
      const cpusAmount = cpus.length;

      console.log(`Number of cpu: ${cpusAmount}`);
      console.log('Cpu information:', cpus);
      break;
    case 'homedir':
      const homedir = sOs.homedir();
      console.log(homedir);
      break;
    case 'username':
      console.log(sOs.userInfo().username);
      break;
    default:
      throwOperationFailed();
      break;
  }
};

export default os;
