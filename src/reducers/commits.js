import * as actionTypes from "../actions/actionTypes";
import { combineReducers } from 'redux';
import Commit from "../state/Commit";

const loadingCommits = (state = false, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_COMMITS:
      return action.loading;
    default:
      return state;
  }
};

const commitsForCurRepo = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_COMMITS:
      return action.commits.map((commit) => new Commit(commit).serialize());
    default:
      return state;
  }
};

export const getCommits = (state = []) => state.commitsForCurRepo
  .map((commit) => new Commit(commit));

export default combineReducers({
  loadingCommits,
  commitsForCurRepo
});