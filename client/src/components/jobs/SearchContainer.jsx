import React from 'react';
import Wrapper from '../../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/AppContext';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilter,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();

  const searchHandler = ({ target }) => {
    if (isLoading) return;
    const { name, value } = target || {};
    console.log(name, value);
    handleChange({ name, value });
  };

  const clearFilterHandler = () => {
    clearFilter();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            label="Search"
            name="search"
            value={search}
            onChange={searchHandler}
          />

          <FormRowSelect
            name="searchStatus"
            label="Status"
            list={['all', ...statusOptions]}
            value={searchStatus}
            onChange={searchHandler}
          />

          <FormRowSelect
            name="searchType"
            label="Type"
            list={['all', ...jobTypeOptions]}
            value={searchType}
            onChange={searchHandler}
          />

          <FormRowSelect
            name="sort"
            label="Sort"
            list={sortOptions}
            value={sort}
            onChange={searchHandler}
          />

          <button
            type="button"
            disabled={isLoading}
            onClick={clearFilterHandler}
            className="btn btn-block btn-danger"
          >
            Clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
