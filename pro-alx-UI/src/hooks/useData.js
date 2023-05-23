import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from './fetchData';

const useList = () => {
    const results = useQuery(['user'], fetchUserData);
  return [results?.data ?? []]
}

export { useList };