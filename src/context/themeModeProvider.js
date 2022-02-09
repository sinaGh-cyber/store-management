import { createContext, useContext, useState } from 'react';

const posableThemeModes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const themeModeContext = createContext(undefined);

const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(posableThemeModes.LIGHT);

  const themeModeToggler = () => {
    themeMode === posableThemeModes.LIGHT
      ? setThemeMode(posableThemeModes.DARK)
      : setThemeMode(posableThemeModes.LIGHT);
  };

  return (
    <>
      <themeModeContext.Provider value={{ themeMode, themeModeToggler }}>
        {children}
      </themeModeContext.Provider>
    </>
  );
};

const useThemeMode = () => {
  const themeModeUseContext = useContext(themeModeContext);
  if (themeModeUseContext) return themeModeUseContext;
  throw Error('ThemeMode provider issue');
};

export default ThemeModeProvider;
export { posableThemeModes, useThemeMode };
