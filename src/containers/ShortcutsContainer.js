import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import * as allActions from '../actions';
import { getFavoriteOrganizations, getRecentOrganizations } from "../reducers/organizations";
import ListPanel from "../components/ListPanel";
import EmptyPanel from "../components/EmptyPanel";
import ShortcutsList from "../components/ShortcutsList";

const transformData = (org) => ({
  id: org.getId(),
  text: org.getName() || org.getLogin(),
  avatarUrl: org.getAvatarUrl()
});

const ShortcutsPanel = ListPanel(ShortcutsList);

class ShortcutsContainer extends Component {

  render() {
    const { recentOrgs, favoriteOrgs, actions } = this.props;

    const emptyOrgs = (
      <EmptyPanel className='empty-orgs'
                  icon='database'
                  message='No organizations yet'/>
    );

    const emptyFavorites = (
      <EmptyPanel className='empty-favorites'
                  icon='star'
                  message='No favorites yet'/>
    );

    return (
      <div className='panel-container'>
        <ShortcutsPanel title='Favorite Organizations'
                        items={favoriteOrgs.map(transformData)}
                        empty={emptyFavorites}
                        actions={actions}/>
        <ShortcutsPanel title='Recent Organizations'
                        items={recentOrgs.map(transformData)}
                        empty={emptyOrgs}
                        actions={actions}/>
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
    recentOrgs: getRecentOrganizations(state.organizations),
    favoriteOrgs: getFavoriteOrganizations(state.organizations)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutsContainer);
