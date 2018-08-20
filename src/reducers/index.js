import { combineReducers } from 'redux';

import organizations, { getCurrentOrganization } from './organizations';
import repositories, * as fromRepos from './repositories';
import commits from './commits';
import * as actionTypes from "../actions/actionTypes";

export const getVisibleRepositories = (state) =>
  fromRepos.getVisibleRepositories(state.repositories, getCurrentOrganization(state.organizations));

export const getRepoOrderByCriteria = (state) =>
  fromRepos.getRepoOrderByCriteria(state.repositories, getCurrentOrganization(state.organizations));

export const searchTerm = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TERM:
      return action.orgName;
    default:
      return state;
  }
};

export default combineReducers({
  organizations,
  repositories,
  commits,
  searchTerm
});
