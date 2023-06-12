import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import localDataMgr from '../utils/localDataMgr';

// handle theme of app globally using local storage and context
export const ThemeContext = createContext(null);

const initialState = () => {
  const localTheme = localDataMgr.get('theme');
  if (localTheme) return;
  localDataMgr.set('theme', 'dark');
};
export const ThemeProvider = ({ children }) => {
  initialState();
  const [theme, setTheme] = useState(localDataMgr.get('theme'));

  // toggle the current theme
  const updateTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localDataMgr.set('theme', newTheme);
  };
  return (
    <ThemeContext.Provider
      value={{
			  theme,
			  updateTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
