import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import {
  Dashboard,
  Leaderboard,
  Profile,
  ErrorPage,
  ViewUser,
  Authenticated,
  WakatimeGuide
} from './LazyLoadedComponents.jsx';

import { ThemeProvider } from './hooks/ThemeContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './hooks/UserContext.jsx';
import TempLoader from './components/loader/TempLoader.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000
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
        element: <Leaderboard />
      },
      {
        path: 'user/:id',
        element: <ViewUser />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'guide',
        element: <WakatimeGuide />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<TempLoader />}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  </Suspense>
);
