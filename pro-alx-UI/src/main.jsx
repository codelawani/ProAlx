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
import BoardList from './pages/leaderboards/BoardList.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  }
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
        index: true
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  },
  {
    path: '',
    element: <Authenticated />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        index: true
      },
      {
        path: 'leaderboard',
        element: <BoardList />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </QueryClientProvider>
);
