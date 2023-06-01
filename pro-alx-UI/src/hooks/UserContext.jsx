import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import localDataMgr from './localDataMgr';
// import { fetchData } from "./fetch";

export const UserContext = createContext(null);
function decodeJWTToken (token) {
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);
  const payload = JSON.parse(decodedPayload);
  return payload;
}
function getUser () {
  const token = localDataMgr.get('access_token');
  console.log(token);
  if (token) {
    const payload = decodeJWTToken(token);
    console.log(payload.user_data);
    return payload.user_data;
  }
  return null;
}
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
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
