import { toast } from 'react-toastify';
import api from '../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from './customContexts';
import { handleLogout } from '../utils/githubOauth';

/**
 * getQueryFunction - This is a utility to help create an object that contains a query function.
 * @param {string} endpoint - The API endpoint.
 * @param {string} method - The request method/http verb.
 * @returns {object} an object with a function property.
 */
const getQueryFunction = (endpoint, method = 'get') => {
  return {
    queryFn: () => {
      return api[method](endpoint);
    }
  };
};

/**
 * useCustomQuery - This is a custom hook for making queries using tanstack query.
 * @param {array} queryKey - A unique firstKey to identify the query.
 * @param {string} endpoint - The endpoint to make request to.
 * @param {object} others - additional options to be passed to useQuery.
 * @returns {object} an object containing the query results.
 */
export const useCustomQuery = ({ queryKey, endpoint, ...others }) => {
  // get a query function using the endpoint
  const { queryFn } = getQueryFunction(endpoint);
  const { setIsLoggedIn, setUser, updateLoading } = useUser();
  const results = useQuery({
    queryKey,
    queryFn,
    ...others,
    onError: err => {
      // log user out when token is no longer authorized
      if (err.response.status === 401) {
        toast.error('session expired. Login again');
        handleLogout(setIsLoggedIn, setUser, updateLoading);
        return;
      }
      toast.error('An error occurred');
      return err;
    },
    onSettled: () => {}
  });
  return {
    ...results,
    value: results?.data?.data
  };
};

/**
 * getMutateFn - This is a utility function to help create an object that contains a mutation function.
 * @param {string} endpoint - The API endpoint.
 * @param {string} method - The http verb/method to be used i.e post, put.
 * @returns {object} an object with a function property.
 */
const getMutateFn = (endpoint, method) => {
  return {
    mutationFn: body => {
      return api[method](endpoint, body);
    }
  };
};

/**
 * useCustomMutation - This is a custom hook that uses useMutation to handle sending data to server.
 * @param {string} endpoint - The endpoint to make request to.
 * @param {string} method - The http verb/method to be used i.e post, put.
 * @param {array} firstKey - query key to update the cache of a previous query.
 * @param {array} secondKey - query key to update the cache of another previous query.
 * @param {object} others - additional options to be passed to useMutation.
 * @returns {object} an object containing the mutate function and other results.
 */
export const useCustomMutation = ({
  endpoint,
  method,
  firstKey = [],
  secondKey = [],
  ...others
}) => {
  const { mutationFn } = getMutateFn(endpoint, method);
  const queryClient = useQueryClient();
  const { setIsLoggedIn, setUser, updateLoading, user } = useUser();

  const results = useMutation({
    mutationFn,
    others,
    onError: err => {
      // log user out when token is no longer authorized
      if (err.response.status === 401) {
        toast.error('session expired. Login again');
        handleLogout(setIsLoggedIn, setUser, updateLoading);
        return;
      }
      toast.error('Error making request.');
      return err;
    },
    onSuccess: data => {
      if (firstKey.length > 0) {
        queryClient.setQueryData(firstKey, prev => {
          let newData;
          // check if payload returned is empty {} (user wants to leave the list)
          if (Object.keys(data.data).length === 0) {
            newData = prev.data.filter(item => item.id !== user.id);
          } else {
            // add the payload returned to the front of the previous list (user requested for a partner)
            newData = [data.data, ...prev.data];
          }
          return { ...prev, data: newData };
        });

        // if another state needs to be updated as well, the query key is passed as secondKey(user profile)
        if (secondKey.length > 0) {
          // check if the payload returned is an empty object
          const isDataEmpty = Object.keys(data.data).length === 0;

          queryClient.setQueryData(secondKey, prev => {
            if (prev) {
              const updatedUserData = isDataEmpty
                ? {
                    ...prev.data.user,
                    requested_project: '',
                    requested_partners: 0
								  }
                : { ...data.data };
              return {
                ...prev,
                data: { ...prev?.data, user: updatedUserData }
              };
            }
          });
        }
        return data;
      }
    },
    onSettled: () => {}
  });
  return {
    ...results,
    value: results?.data?.data
  };
};
