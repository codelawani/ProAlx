import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    console.log('state');
    if (storedValue) {
      setState(JSON.parse(storedValue));
    }
  }, [key]);
  const setLocalStorageState = (value) => {
    setState(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setLocalStorageState];
};

export default useLocalStorageState;
