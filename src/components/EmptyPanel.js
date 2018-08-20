import React from 'react';
import { Header, Icon } from "semantic-ui-react";

const EmptyPanel = ({ className, icon, message }) => (
  <div className={className}>
    <Header as='h4' icon textAlign='center'>
      <Icon name={icon} circular/>
      <Header.Content>{message}</Header.Content>
    </Header>
  </div>
);

export default EmptyPanel;