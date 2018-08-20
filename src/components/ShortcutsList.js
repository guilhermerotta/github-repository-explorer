import React from 'react';
import { Image, List } from "semantic-ui-react";

const ShortcutsList = ({ items, actions }) => (
  <List selection verticalAlign='middle'>
    {items.map((item) => (
      <List.Item key={item.id} onClick={() => actions.setCurrentOrg(item.id)}>
        <Image avatar src={item.avatarUrl}/>
        <List.Content>
          <List.Header>{item.text}</List.Header>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default ShortcutsList;