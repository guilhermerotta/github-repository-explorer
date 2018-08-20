import React from 'react';
import moment from 'moment';
import { Card, Icon, Image } from "semantic-ui-react";

export const RepositoryCard = ({ repository, onClick }) => (
  <Card onClick={onClick}>
    <Card.Content>
      <Image src={repository.getAvatarUrl()} floated='left' size='mini'/>
      <Card.Header>{repository.getName()}</Card.Header>
      <Card.Meta>
        <span>Last updated {moment(repository.getUpdatedAt()).format('MM-DD-YYYY')}</span>
      </Card.Meta>
      <Card.Description>{repository.getDescription()}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='repo-card-counts-info'>
      <span>
        <Icon name='fork'/>{repository.getForksCount()} Forks
      </span>
        <span>
        <Icon name='star'/>{repository.getStargazersCount()} Stargazers
      </span>
      </div>
    </Card.Content>
  </Card>
);