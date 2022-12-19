import { ERROR_MESSAGE } from './messages.js';

export const isNotEmpty = (value) => value !== undefined && value !== '' && value !== null;

export const isEmpty = (value) => value === undefined || value === '' || Object.is(value, null);

export const throwOperationFailed = () => {
  throw new Error(ERROR_MESSAGE.operationFailed);
}

export const throwInvalidInput = () => {
  throw new Error(ERROR_MESSAGE.invalidInput);
}