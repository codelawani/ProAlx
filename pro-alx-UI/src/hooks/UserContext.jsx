import { createContext, useState} from 'react';
import PropTypes from 'prop-types';
//import { fetchData } from "./fetch";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(!!user);
	// useEffect(() => {
	//     //const data = await fetchData(url,{})
	//     //const data = ;
	//     //setUser(data);
	//     console.log(user);
	// }, [data])

	const updateLoading = current => {
		setIsLoading(current);
	};
	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isLoading,
				updateLoading,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};



UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
