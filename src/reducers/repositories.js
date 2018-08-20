import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import Repository from "../state/repository";

const loadingRepos = (state = false, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_REPOS:
      return action.loading;
    default:
      return state;
  }
};

const selectedRepo = (state = -1, action = {}) => {
  switch (action.type) {
    case actionTypes.SELECT_REPO:
      return action.repoId;
    case actionTypes.SET_SEARCH_TERM:
      return -1;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_REPOS:
      return action.repositories.reduce((obj, rawRepo) => {
        const repo = new Repository(rawRepo);
        obj[repo.getId()] = repo.serialize();
        return obj;
      }, {});
    default:
      return state;
  }
};

const byOrgId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_SORT_REPOS_CRITERIA:
      return {
        ...state,
        [action.orgId]: {
          orderBy: action.criteria,
          dataType: action.dataType
        }
      };
    default:
      return state;
  }
};

const allRepos = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_REPOS:
      return action.repositories.map(repo => new Repository(repo).getId());
    default:
      return state
  }
};

const getRepository = (state, id) => new Repository(state.byId[id]);

export const getRepoOrderByCriteria = (state, org) => {
  if (!org) {
    return null;
  }
  const repo = state.byOrgId[org.getId()];
  return repo ? repo.orderBy : null;
};

export const getVisibleRepositories = (state, org) => state.allRepos
  .slice()
  .sort((repoA, repoB) => {
    const criteria = state.byOrgId[org.getId()];
    if(criteria) {
      const criteriaA = state.byId[repoA][criteria.orderBy];
      const criteriaB = state.byId[repoB][criteria.orderBy];
      if(criteria.dataType === 'date') {
        const dateA = new Date(criteriaA);
        const dateB = new Date(criteriaB);
        return dateB - dateA;
      }
      return criteriaB - criteriaA;
    }
    return null;
  })
  .map((id) => getRepository(state, id));

export const getSelectedRepo = (state) => getRepository(state, state.selectedRepo);

export default combineReducers({
  loadingRepos,
  byId,
  byOrgId,
  allRepos,
  selectedRepo
});
