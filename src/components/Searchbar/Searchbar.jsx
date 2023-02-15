import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query); //props onSubmit приймає в якості аргумента оновлений state
    this.setState({ query: '' }); //очищення форми
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>
              <BiSearchAlt />
            </span>
          </button>

          <input
            name="query"
            value={this.state.query}
            onChange={this.handleInput}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
