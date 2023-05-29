import { toast } from 'react-toastify';
import api from './api';

// Json web token is being used

// function fetchUserData({ query, url }) {
//      axios.get(`${apiUrl}${url}`).then((res)=> res.data).catch(err => {
//     toast.error("something went wrong");
//         toast.error(err);
//      })

//     return

// }

const fetchUserData = async () => {
  try {
    const response = await api.get('/user/data');
    const data = response.data;
    // Do something with the data
    return data;
  } catch (err) {
    toast.error('Something went wrong');
    toast.error(err.message);
  }
};

export { fetchUserData };
