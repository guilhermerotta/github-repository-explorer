import React  from 'react';
import PropTypes from 'prop-types';
import {  Header, Image } from "semantic-ui-react";
import gitHubImg from '../images/github-home.svg';
import './Homepage.css';
import SearchInput from "./SearchInput";

const Homepage = ({actions}) => (
  <div className='homepage'>
    <Image size='medium' src={gitHubImg}/>
    <Header as='h1'>GitHub Repository Explorer</Header>
    <SearchInput onSearch={actions.setSearchTerm}/>
  </div>
);

Homepage.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Homepage;