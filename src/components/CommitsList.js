import React from 'react';
import { Image, List } from "semantic-ui-react";
import notFound from '../images/not-found.png';
import moment from "moment";

const onClick = (url) => {
  if (window) {
    window.open(url, '_blank');
  }
};

const CommitsList = ({ items }) => (
  <List selection divided relaxed>
    {items.map((commit) => {
      return (
        <List.Item key={commit.getSha()} onClick={() => onClick(commit.getUrl())}>
          <Image avatar src={commit.getAuthorAvatarUrl() || notFound}/>
          <List.Content>
            <List.Header>{commit.getMessage().split('\n')[0]}</List.Header>
            <List.Description>
              Committed by{' '}
              <b>{commit.getAuthorLogin()}</b>{' '}
              on {moment(commit.getDate()).format('MM-DD-YYYY hh:mm')}
            </List.Description>
          </List.Content>
        </List.Item>
      )
    })}
  </List>
);

export default CommitsList;