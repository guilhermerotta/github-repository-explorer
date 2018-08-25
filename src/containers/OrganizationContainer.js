import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Button, Segment } from 'semantic-ui-react';
import { getCurrentOrganization, isOrgFavorite } from "../reducers/organizations";
import { OrganizationCard } from "../components/OrganizationCard";
import { bindActionCreators } from 'redux';
import * as allActions from "../actions";

class OrganizationContainer extends Component {

  componentDidMount() {
    const { actions, searchTerm } = this.props;
    this.toggleFavoriteOrg = this.toggleFavoriteOrg.bind(this);
    actions.fetchOrganization(searchTerm);
  }

  componentDidUpdate(prevProps) {
    const { actions, searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      actions.fetchOrganization(searchTerm);
    }
  }

  toggleFavoriteOrg() {
    const { actions, organization } = this.props;
    actions.toggleFavoriteOrg(organization.getId());
  }

  render() {
    const { organization, loadingOrg, isFavorite } = this.props;
    const favButton = organization.getId() !== -1 &&
      (<Button toggle active={isFavorite} size='small'
               onClick={this.toggleFavoriteOrg}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </Button>);
    return organization ?
      <Segment basic compact loading={loadingOrg}>
        <div className='org-card'>
          <OrganizationCard organization={organization} favButton={favButton}/>
        </div>
      </Segment>
      : null;
  }

}

function mapStateToProps(state) {
  return {
    loadingOrg: state.organizations.loadingOrg,
    organization: getCurrentOrganization(state.organizations),
    isFavorite: isOrgFavorite(state.organizations),
    searchTerm: state.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationContainer);
