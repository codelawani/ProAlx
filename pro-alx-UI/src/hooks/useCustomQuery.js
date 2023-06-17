import { toast } from 'react-toastify';
import api from '../utils/api';
import { useQuery, useMutation } from '@tanstack/react-query';

/**
 * getQueryFunction - This is a utility to help create an object that contains a query function.
 * @param {string} endpoint - The API endpoint.
 * @returns {object} an object with a function property.
 */
const getQueryFunction = endpoint => {
	return {
		queryFn: () => {
			return api.get(endpoint);
		},
	};
};

/**
 * useCustomQuery - This is a custom hook for making queries using tanstack query.
 * @param {array} queryKey - A unique key to identify the query.
 * @param {string} endpoint - The endpoint to make request to.
 * @param {object} others - additional options to be passed to useQuery.
 * @returns {object} an object containing the query results.
 */
export const useCustomQuery = ({ queryKey, endpoint, ...others }) => {
	// get a query function using the endpoint
	const { queryFn } = getQueryFunction(endpoint);
	const results = useQuery({
		queryKey: queryKey,
		queryFn,
		...others,
		onError: err => {
			toast.error('An error occurred');
			return err;
		},
		onSettled: () => {
			return;
		},
	});
	return {
		...results,
		value: results?.data?.data,
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
		},
	};
};

/**
 * useCustomMutation - This is a custom hook that uses useMutation to handle sending data to server.
 * @param {string} endpoint - The endpoint to make request to.
 * @param {string} method - The http verb/method to be used i.e post, put.
 * @param {object} others - additional options to be passed to useMutation.
 * @returns {object} an object containing the mutate function and other results.
 */
export const useCustomMutation = ({ endpoint, method, ...others }) => {
	const { mutationFn } = getMutateFn(endpoint, method);

	const results = useMutation({
		mutationFn,
		others,
		onError: err => {
			toast.error('Error making request.');
			return err;
		},
		onSettled: () => {
			return;
		},
	});
	return {
		...results,
	};
};
