import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../utils/localDataMgr';

// create global user context to be used when required in any component
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const updateLoading = current => {
    setIsLoading(current);
  };
  return (
    <UserContext.Provider
      value={{
			  user,
			  setUser,
			  isLoading,
			  updateLoading,
			  isLoggedIn,
			  setIsLoggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
