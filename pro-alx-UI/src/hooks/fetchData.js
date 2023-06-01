import { toast } from 'react-toastify';
import api from './api';
import { useQuery } from '@tanstack/react-query';

const apiRequest = async (endpoint) => {
  return api.get(endpoint);
};

const fetchUserData = (endpoint) => {
  return {
    queryFn: () => {
      return apiRequest(endpoint);
    }
  };
};

export const useUserData = ({ queryKey, endpoint }) => {
  const { queryFn } = fetchUserData(endpoint);
  const results = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    onError: err => {
      if (err) {
        console.log(err);
      } else {
        toast.error('something went wrong');
      }
    },
    onSettled: () => {
      console.log(results.data?.data);
    }
  });
  return {
    ...results,
    value: results.data?.data
  };
};
