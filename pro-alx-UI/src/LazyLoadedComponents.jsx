import { lazy } from 'react';

// lazy loaded components
import './index.css';
export const ErrorPage = lazy(() => import('./pages/error/ErrorPage.jsx'));
export const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.jsx'));
export const Contact = lazy(() => import('./pages/contact/Contact.jsx'));
export const Leaderboard = lazy(() =>
	import('./pages/leaderboards/PaginatedLeaderboard.jsx')
);
export const ViewUser = lazy(() => import('./components/details/ViewUser.jsx'));
export const Profile = lazy(() => import('./components/details/Profile.jsx'));
export const Authenticated = lazy(() =>
	import('./components/layout/Authenticated.jsx')
);
