import { toast } from 'react-toastify';
import api from './api';
import { useQuery, useMutation } from '@tanstack/react-query';

const apiRequest = async (endpoint, method = 'get', body = null) => {
	if (method.toLocaleLowerCase === 'get') return api[method](endpoint);
	return api[method](endpoint, {
		params: {
			...body,
		},
	});
};

const fetchUserData = endpoint => {
	return {
		queryFn: () => {
			return apiRequest(endpoint);
		},
	};
};

const updateUserData = (endpoint, body) => {
	return {
		queryFn: () => {
			return apiRequest(endpoint, body);
		},
	};
};

export const useUserData = ({ queryKey, endpoint, ...others }) => {
	const { queryFn } = fetchUserData(endpoint);
	const results = useQuery({
		queryKey: queryKey,
		queryFn,
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
		value: results?.data?.data,
	};
};

export const useCustomMutation = ({
	mutationKey,
	endpoint,
	body,
	...others
}) => {
	const { mutationFn } = updateUserData(endpoint, body);
	const results = useMutation({
		mutationKey: mutationKey,
		mutationFn,
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
		value: results?.data,
	};
};
