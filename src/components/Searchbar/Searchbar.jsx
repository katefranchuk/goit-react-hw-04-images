import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = ({ target: { name, value } }) => {
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query); //props onSubmit приймає в якості аргумента оновлений state
    setQuery(''); //очищення форми
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>
            <BiSearchAlt />
          </span>
        </button>

        <input
          name="query"
          value={query}
          onChange={handleInput}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
