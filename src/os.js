import * as sOs from 'os';

const os = async (args) => {
  const currArg = args[0];

  switch (currArg) {
    case 'EOL':
      console.log(JSON.stringify(sOs.EOL));
      break;
    case 'architecture':
      console.log(sOs.arch());
      break;
    case 'cpus':
      const cpus = sOs.cpus().map(cpu => cpu.model);
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
      break;



  }
}

export default os;