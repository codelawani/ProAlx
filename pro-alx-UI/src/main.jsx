// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ErrorPage from './pages/error/ErrorPage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Contact from './pages/contact/Contact.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Authenticated from './components/layout/Authenticated.jsx';
import { UserProvider } from './hooks/UserContext.jsx';
import Home from './pages/home/Home.jsx';
import Leaderboard from './pages/leaderboards/PaginatedLeaderboard.jsx';
import ViewUser from './components/details/ViewUser.jsx';
import { ThemeProvider } from './hooks/ThemeContext.jsx';
import Profile from './components/details/Profile.jsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 60 * 60 * 1000,
			cacheTime: 60 * 60 * 1000,
		},
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <Home />,
				index: true,
			},
			{
				path: 'contact',
				element: <Contact />,
			},
		],
	},
	{
		path: '',
		element: <Authenticated />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />,
				index: true,
			},
			{
				path: 'leaderboard',
				element: <Leaderboard />,
			},
			{
				path: 'user/:id',
				element: <ViewUser />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</UserProvider>
	</QueryClientProvider>
);
