import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorageState from './useLocalStorageState';
import { useCookies } from 'react-cookie';
import localDataMgr from './localDataMgr';
// import { fetchData } from "./fetch";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(localDataMgr.get('name'));
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localDataMgr.get('access_token'));
  // useEffect(() => {
  //     //const data = await fetchData(url,{})
  //     //const data = ;
  //     //setUser(data);
  //     console.log(user);
  // }, [data])

  const updateLoading = current => {
    setIsLoading(current);
  };
  return (
    <UserContext.Provider
      value={{
        // user,
        // setUser,
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
