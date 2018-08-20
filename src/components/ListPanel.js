import React from 'react';
import { Button, Header, Icon, Menu, Segment } from "semantic-ui-react";

const ListPanel = (WrappedComponent) =>
  ({ title, loading, empty, onClose, items = [], ...otherProps }) => (
    <div>
      <Menu borderless attached='top'>
          <Menu.Item>
            <Header as='h4'>
              {title}
            </Header>
          </Menu.Item>
          {onClose &&
          <Menu.Menu position='right'>
            <Menu.Item fitted>
              <Button icon onClick={onClose}>
                <Icon name='close'/>
              </Button>
            </Menu.Item>
          </Menu.Menu>}
      </Menu>

      <Segment attached loading={loading}>
        {!items.length
          ? empty
          : <WrappedComponent items={items} {...otherProps}/>}
      </Segment>
    </div>
  );

export default ListPanel;