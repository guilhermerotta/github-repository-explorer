import * as actionTypes from "./actionTypes";

export * from './repositories';
export * from './organizations';
export * from './commits';

export const setSearchTerm = (orgName) => ({
  type: actionTypes.SET_SEARCH_TERM,
  orgName
});

export const setErrorMessage = (message) => ({
  type: actionTypes.SET_ERROR_MSG,
  message
});
