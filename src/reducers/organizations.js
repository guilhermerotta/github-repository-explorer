import * as actionTypes from '../actions/actionTypes';
import Organization from "../state/organization";
import { combineReducers } from 'redux';

const loadingOrg = (state = false, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_ORG:
      return action.loading;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORG:
      const org = new Organization(action.organization);
      return {
        ...state,
        [org.getId()]: org.serialize()
      };
    default:
      return state;
  }
};

const allOrgs = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORG:
      const orgId = new Organization(action.organization).getId();
      return [...new Set([orgId, ...state])];
    case actionTypes.SET_CURRENT_ORG:
      return [...new Set([action.orgId, ...state])];
    default:
      return state;
  }
};

const favoriteOrgs = (state = [], action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FAVORITE_ORG:
      return state.includes(action.orgId)
        ? state.filter((id) => id !== action.orgId)
        : [action.orgId, ...state];
    default:
      return state;
  }
};

export const getOrganization = (state, id) => new Organization(state.byId[id]);

export const getCurrentOrganization = (state) =>
  state.allOrgs.length ? getOrganization(state, state.allOrgs[0]) : null;

export const getRecentOrganizations = (state) =>
  state.allOrgs.filter((id) => id !== -1).map((id) => getOrganization(state, id));

export const getFavoriteOrganizations = (state) =>
  state.favoriteOrgs.map((id) => getOrganization(state, id));

export const isOrgFavorite = (state) => {
  const currentOrg = getCurrentOrganization(state);
  return currentOrg && state.favoriteOrgs.includes(currentOrg.getId());
};

export default combineReducers({
  loadingOrg,
  byId,
  allOrgs,
  favoriteOrgs
});


