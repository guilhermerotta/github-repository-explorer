import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { bindActionCreators } from 'redux';
import * as allActions from "../actions";
import ListPanel from "../components/ListPanel";
import { getSelectedRepo } from "../reducers/repositories";
import EmptyPanel from "../components/EmptyPanel";
import { getCommits } from "../reducers/commits";
import CommitsList from "../components/CommitsList";

const CommitsPanel = ListPanel(CommitsList);

class CommitsContainer extends Component {

  componentDidMount() {
    const { actions, selectedRepo } = this.props;
    actions.fetchCommits(selectedRepo.getOwner(), selectedRepo.getName());
  }

  componentDidUpdate(prevProps) {
    const { actions, selectedRepo } = this.props;
    if (prevProps.selectedRepo.getId() !== selectedRepo.getId()) {
      actions.fetchCommits(selectedRepo.getOwner(), selectedRepo.getName());
    }
  }

  render() {
    const { actions, commits, loadingCommits, selectedRepo } = this.props;

    const emptyCommits = (
      <EmptyPanel className='empty-favorites'
                  icon='code'
                  message='No commits'/>
    );

    return (
      <div className='panel-container'>
        <CommitsPanel title={`Latest commits for ${selectedRepo.getName()}`}
                      loading={loadingCommits}
                      items={commits}
                      onClose={() => actions.selectRepository(-1)}
                      empty={emptyCommits}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    selectedRepo: getSelectedRepo(state.repositories),
    loadingCommits: state.commits.loadingCommits,
    commits: getCommits(state.commits)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitsContainer);
