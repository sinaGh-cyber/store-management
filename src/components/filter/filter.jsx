import style from './filter.module.scss';

import WithTheme from '../../hoc/withTheme/withTheme';

import SelectComponent from '../../common/select/select';
import SearchBar from '../../common/search/search';
import { useState } from 'react';
import { useProductsActions } from '../../context/productsProvider';

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'Xs', label: 'Xs' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
];

const sortOptions = [
  { value: 'highest', label: 'highest' },
  { value: 'lowest', label: 'lowest' },
];

const Filter = ({ isDark }) => {
  const dispatch = useProductsActions();

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const onFilterValueChangeHandler = ({ value }) => {
    dispatch({ type: 'filter', data: { filterVal: value, sortVal: sort } });
    setFilter(value);
  };

  const onSortValueChangeHandler = ({ value }) => {
    dispatch({ type: 'sort', data: value });
    setSort(value);
  };

  return (
    <section
      className={`${style.filters} ${isDark ? style.bgDark : style.bgLight}`}
    >
      {' '}
      <div className={style.filtersWarper}>
        <SearchBar filter={filter} />
        <SelectComponent
          value={filter}
          placeholder="filter by size"
          options={filterOptions}
          onChange={onFilterValueChangeHandler}
        />
        <SelectComponent
          value={sort}
          placeholder="Sort by price"
          options={sortOptions}
          onChange={onSortValueChangeHandler}
        />
      </div>
    </section>
  );
};

export default WithTheme(Filter);
