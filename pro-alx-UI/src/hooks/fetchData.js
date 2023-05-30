import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = 'http://127.0.0.1:5000/api/v1';

// function fetchUserData({ query, url }) {
//      axios.get(`${apiUrl}${url}`).then((res)=> res.data).catch(err => {
//     toast.error("something went wrong");
//         toast.error(err);
//      })

//     return

// }

const fetchUserData = async () => {
    try {
		const response = await axios.get(`${apiUrl}/user/data`);
		const data = response.data;
		// Do something with the data
		return data;
	} catch (err) {
		toast.error('Something went wrong');
		toast.error(err.message);
	}
};

export { fetchUserData };
