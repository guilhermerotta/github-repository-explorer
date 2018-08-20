import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../actions';
import { Header, Menu, Segment } from 'semantic-ui-react';
import { getRepoOrderByCriteria, getVisibleRepositories } from "../reducers";
import RepositoryList from "../components/RepositoryList";
import { getCurrentOrganization } from "../reducers/organizations";
import { SORT_OPTIONS } from "../state/repository";
import { RepositoryCard } from "../components/RepositoryCard";

class RepositoriesContainer extends Component {

  constructor(props) {
    super(props);
    this.sortGrid = this.sortGrid.bind(this);
  }

  componentDidMount() {
    const { actions, searchTerm } = this.props;
    console.log('MOUNTED REPOSITORIES, LOADING');
    actions.fetchRepositories(searchTerm);
  }

  componentDidUpdate(prevProps) {
    const { actions, currentOrg } = this.props;
    if (prevProps.currentOrg && prevProps.currentOrg.getId() !== currentOrg.getId()) {
      console.log('REPOS CHANGED, RELOADING');
      actions.fetchRepositories(currentOrg.getLogin());
    }
  }

  sortGrid(evt, data) {
    const { currentOrg, actions } = this.props;
    actions.setSortReposCriteria(currentOrg.getId(), SORT_OPTIONS[data.name].value);
  }

  render() {
    const { actions, repositories, loadingRepos, orderBy } = this.props;

    return (
      <div>
        <Menu pointing attached='top'>
          <Menu.Menu>
            <Menu.Item>
              <Header as='h4'>
                Sort By
              </Header>
            </Menu.Item>
          </Menu.Menu>
          {Object.keys(SORT_OPTIONS).map((option) => (
            <Menu.Item key={option}
                       name={option}
                       active={SORT_OPTIONS[option].value === orderBy}
                       onClick={this.sortGrid} />
          ))}
          {/*<Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>*/}
        </Menu>
        <Segment attached loading={loadingRepos}>
          <RepositoryList>
            {repositories.map((repository) =>
              <RepositoryCard key={repository.getId()}
                              onClick={() => actions.selectRepository(repository.getId())}
                              repository={repository}/>
            )}
          </RepositoryList>
        </Segment>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    loadingRepos: state.repositories.loadingRepos,
    repositories: getVisibleRepositories(state),
    orderBy: getRepoOrderByCriteria(state),
    currentOrg: getCurrentOrganization(state.organizations),
    searchTerm: state.searchTerm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesContainer);
