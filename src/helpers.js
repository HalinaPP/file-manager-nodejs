export const getArgv = (params) => {
  return params.filter(param => param.startsWith('--') && param.length > 2).map(param => param.slice(2));
} 