import GitHubApi from '@octokit/rest';
import * as actionTypes from './actionTypes';

const gitHubApi = new GitHubApi();

const loadOrg = (organization) => ({
  type: actionTypes.LOAD_ORG,
  organization
});

const setLoadingOrg = (loading) => ({
  type: actionTypes.SET_LOADING_ORG,
  loading
});

export const setCurrentOrg = (orgId) => ({
  type: actionTypes.SET_CURRENT_ORG,
  orgId
});

export const toggleFavoriteOrg = (orgId) => ({
  type: actionTypes.TOGGLE_FAVORITE_ORG,
  orgId
});

export const fetchOrganization = (org) =>
  (dispatch) => {
    dispatch(setLoadingOrg(true));
    gitHubApi.orgs.get({ org })
      .then(({ data }) => {
        dispatch(loadOrg(data));
        dispatch(setLoadingOrg(false));
      }).catch(() => {
      dispatch(loadOrg({}));
      dispatch(setLoadingOrg(false));
    })
  };