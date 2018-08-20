import React from 'react';
import ReactDOM from 'react-dom';
import GitHubExplorer from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GitHubExplorer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
