import { toast } from 'react-toastify';
import api from './api';
import { useQuery } from '@tanstack/react-query';

const apiRequest = async endpoint => {
	return api.get(endpoint);
};

const fetchUserData = endpoint => {
	return {
		queryFn: () => {
			return apiRequest(endpoint);
		},
	};
};

export const useUserData = ({ queryKey, endpoint, ...others }) => {
	const { queryFn } = fetchUserData(endpoint);
	const results = useQuery({
		queryKey: [queryKey],
		queryFn: queryFn,
		others,
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
		value: results.data?.data,
	};
};
