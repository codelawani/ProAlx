import { useContext } from 'react';

import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';

export const useUser = () => useContext(UserContext);

export const useTheme = () => useContext(ThemeContext);
