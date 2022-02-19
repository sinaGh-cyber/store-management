import WithTheme from '../../hoc/withTheme/withTheme';

import style from './select.module.scss';
import Select from 'react-select';

const SelectComponent = ({ isDark, ...Rest }) => {
  const currentTheme = isDark
    ? {
        neutral0: '#757575',
        neutral20: '#bdbdbd',
        neutral30: '#eeeeee',
        neutral40: '#e0e0e0',
        neutral50: '#e0e0e0',
      }
    : {
        neutral0: '#f3e5f5',
        neutral20: '#8e24aa',
        neutral50: '#37474f',
      };

  return (
    <div
      className={`${style.selectWarper} ${
        isDark ? style.bgDark : style.bgLight
      }`}
    >
      <Select
        {...Rest}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            ...currentTheme,
          },
        })}
        classNamePrefix={style.selectPrefix}
        className={style.Select}
      />
    </div>
  );
};

export default WithTheme(SelectComponent);
