import WithTheme from '../../hoc/withTheme/withTheme';
import { useState } from 'react';
import { useProductsActions } from '../../context/productsProvider';

import style from './search.module.scss';

const SearchBar = ({ isDark, filter }) => {
  const dispatch = useProductsActions();
  const [value, setValue] = useState('');

  const changeHandler = (e) => {
    setValue(e.target.value);
    new Promise((resolve) => {
      resolve(true);
    })
      .then((prevRes) => {
        if (prevRes) {
          const res = dispatch({ type: 'filter', data: filter });
          return res;
        }
      })
      .then((prevRes) => {
        if (prevRes) {
          let res = dispatch({ type: 'search', data: e.target.value });
          return res;
        }
      });
    return;
  };

  return (
    <div
      className={`${style.searchWarper} ${
        isDark ? style.bgDark : style.bgLight
      }`}
    >
      <input
        onChange={changeHandler}
        value={value}
        type="text"
        placeholder="search for..."
        className={style.searchInput}
      />
    </div>
  );
};

export default WithTheme(SearchBar);
