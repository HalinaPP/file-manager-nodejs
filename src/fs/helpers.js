import { access } from 'fs/promises';

export const isExists = async (sourceName) => {
  let isSourceExists = false;

  try {
    await access(sourceName);
    isSourceExists = true;
  } catch (err) { }

  return isSourceExists;
}

