import GitHubApi from '@octokit/rest';
import * as actionTypes from './actionTypes';

const gitHubApi = new GitHubApi();

const loadRepos = (repositories) => ({
  type: actionTypes.LOAD_REPOS,
  repositories
});

const setLoadingRepos = (loading) => ({
  type: actionTypes.SET_LOADING_REPOS,
  loading
});

export const setSortReposCriteria = (orgId, criteria, dataType) => ({
  type: actionTypes.SET_SORT_REPOS_CRITERIA,
  orgId,
  criteria,
  dataType
});

export const selectRepository = (repoId) => ({
  type: actionTypes.SELECT_REPO,
  repoId
});

export const fetchRepositories = (org) =>
  (dispatch) => {
    console.log('####### INSIDE CALL TO GET REPOS ######');
    dispatch(setLoadingRepos(true));
    gitHubApi.repos.getForOrg({
      org,
      type: 'public'
    }).then(({ data }) => {
      dispatch(loadRepos(data));
      dispatch(setLoadingRepos(false));
    }).catch(() => {
      dispatch(loadRepos([]));
      dispatch(setLoadingRepos(false));
    });
  };
