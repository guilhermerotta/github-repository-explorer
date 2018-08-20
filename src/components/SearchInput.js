import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from "semantic-ui-react";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.state = {
      searchInput: ''
    };
  }

  onChangeInput(evt) {
    this.setState({
      searchInput: evt.target.value
    });
  }

  inputIsValid() {
    return this.state.searchInput.trim().length > 0;
  }

  onKeyUp(evt) {
    if (evt.key === 'Enter' && this.inputIsValid()) {
      this.handleInput();
    }
  }

  handleInput() {
    const { onSearch } = this.props;
    if (this.inputIsValid()) {
      onSearch(this.state.searchInput.trim());
    }
  }

  render() {
    const { disabled, small } = this.props;
    return (
      <div className='search-input'>
        <Input onKeyUp={this.onKeyUp} onChange={this.onChangeInput} action
               size={small ? 'medium' : 'big'}
               placeholder='Type an organization name'>
          <input/>
          <Button disabled={disabled || !this.inputIsValid()}
                  onClick={this.handleInput}>
            Explore
          </Button>
        </Input>
      </div>
    )
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  small: PropTypes.bool
};

export default SearchInput;