import * as actionTypes from "./actionTypes";

export * from './repositories';
export * from './organizations';
export * from './commits';

export const setSearchTerm = (orgName) => ({
  type: actionTypes.SET_SEARCH_TERM,
  orgName
});
