import GitHubApi from '@octokit/rest';
import * as actionTypes from './actionTypes';
import { setErrorMessage } from "./index";

const gitHubApi = new GitHubApi();

const loadCommits = (commits) => ({
  type: actionTypes.LOAD_COMMITS,
  commits
});

const setLoadingCommits = (loading) => ({
  type: actionTypes.SET_LOADING_COMMITS,
  loading
});

export const fetchCommits = (owner, repo) =>
  (dispatch) => {
    dispatch(setLoadingCommits(true));
    gitHubApi.repos.getCommits({ owner, repo, per_page: 100 })
      .then(({ data }) => {
        dispatch(loadCommits(data));
        dispatch(setLoadingCommits(false));
      }).catch((e) => {
      dispatch(loadCommits([]));
      dispatch(setLoadingCommits(false));
      dispatch(setErrorMessage(e.message));
    })
  };