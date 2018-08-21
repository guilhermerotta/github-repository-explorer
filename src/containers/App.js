import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Image, Grid, Container, Menu } from 'semantic-ui-react';
import gitHubImg from '../images/github.png';
import RepositoriesContainer from "./RepositoriesContainer";
import * as allActions from "../actions";
import { bindActionCreators } from 'redux';
import OrganizationContainer from "./OrganizationContainer";
import ShortcutsContainer from './ShortcutsContainer';
import Homepage from "../components/Homepage";
import SearchInput from "../components/SearchInput";
import CommitsContainer from "./CommitsContainer";
import ErrorMessage from "../components/ErrorMessage";

const App = ({ actions, searchTerm, loadingOrg, selectedRepo, errorMessage }) => {
  if (!searchTerm) {
    return (
      <Homepage actions={actions}/>
    );
  }

  const isRepoCardOpen = selectedRepo !== -1;

  return (
    <div>
      <Menu className='menu-container' inverted borderless attached='top'>
        <Container>
          <Menu.Item>
            <Image size='mini' src={gitHubImg} style={{ marginRight: '1.5em' }}/>
            GitHub Explorer
          </Menu.Item>
          <Menu.Item>
            <SearchInput small loading={loadingOrg} onSearch={actions.setSearchTerm}/>
          </Menu.Item>
        </Container>
      </Menu>
      <ErrorMessage message={errorMessage} onClose={() => actions.setErrorMessage(null)}/>
      <div className='org-container'>
        <OrganizationContainer/>
      </div>
      <div className='repo-container'>
        <Grid stackable>
          <Grid.Row columns={2} stretched>
            <Grid.Column width={isRepoCardOpen ? 8 : 12}>
              <RepositoriesContainer/>
            </Grid.Column>
            <Grid.Column width={isRepoCardOpen ? 8 : 4}>
              {isRepoCardOpen
                ? <CommitsContainer/>
                : <ShortcutsContainer/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    loadingOrg: state.organizations.loadingOrg,
    selectedRepo: state.repositories.selectedRepo,
    errorMessage: state.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);