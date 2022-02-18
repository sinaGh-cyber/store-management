import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';
import { useEffect, useState } from 'react';

const WithTheme = (WrappedComponent, incrementValue) => {
  const UpdatedComponent = (props) => {
    const { themeMode, themeModeToggler } = useThemeMode();
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
      if (themeMode === posableThemeModes.DARK) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }, [themeMode]);

    return (
      <WrappedComponent
        isDark={isDark}
        themeModeToggler={themeModeToggler}
        {...props}
      />
    );
  };

  return UpdatedComponent;
};

export default WithTheme;