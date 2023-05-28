import { useEffect, useState } from 'react';
import localDataMgr from './localDataMgr';
const useLocalStorageState = (key, defaultValue) => {
  const [state, setstate] = useState(() => {
    const storedValue = localDataMgr.get(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localDataMgr.set(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setstate];
};

export default useLocalStorageState;
