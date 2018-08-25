import React from 'react';
import moment from 'moment';
import { Item, List } from "semantic-ui-react";
import notFound from '../images/not-found.png';

export const OrganizationCard = ({ organization, favButton }) => (
  <Item.Group>
    <Item>
      <Item.Image size='small' src={organization.getAvatarUrl() || notFound}/>
      <Item.Content verticalAlign='middle'>
        <Item.Header>{organization.getName()}{favButton}</Item.Header>
        {organization.getCreatedAt() &&
        <Item.Extra>Created on {moment(organization.getCreatedAt()).format('MM-DD-YYYY')}</Item.Extra>}
        <List>
          {organization.getLocation() &&
          <List.Item icon='marker' content={organization.getLocation()}/>}
          {organization.getEmail() &&
          <List.Item icon='mail' content={<a href={`mailto:${organization.getEmail()}`}>
            {organization.getEmail()}
          </a>}/>}
          {organization.getUrl() &&
          <List.Item icon='linkify'
                     content={<a href={organization.getUrl()} target='_blank'>
                       {organization.getUrl()}
                     </a>}/>}
        </List>
      </Item.Content>
    </Item>
  </Item.Group>
);