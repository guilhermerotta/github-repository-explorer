import React from 'react';
import { Card } from "semantic-ui-react";
import EmptyPanel from "./EmptyPanel";

const RepositoryList = ({ children }) => {
  if (!React.Children.count(children)) {
    return (
      <EmptyPanel className='empty-repos'
                  icon='database'
                  message='No repositories to show'/>
    )
  }

  return (
    <Card.Group centered>
      {children}
    </Card.Group>
  );
};

export default RepositoryList;