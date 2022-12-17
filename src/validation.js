export const isNotEmpty = (value) => value !== undefined && value !== '' && value !== null;

export const isEmpty = (value) => value === undefined && value === '' && object.is(value, null);
