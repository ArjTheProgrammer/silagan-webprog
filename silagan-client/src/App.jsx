import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />, 
    errorElement: <NotFoundPage />, 
    children: [
      {
        path: '',
        element: <HomePage />, 
      },
      {
        path: 'about',
        element: <AboutPage />, 
      },
      {
        path: 'articles',
        element: <ArticleListPage />, 
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />, 
      },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />, 
    errorElement: <NotFoundPage />, 
    children: [
      {
        path: "signin",
        element: <SignInPage />, 
      },
      {
        path: "signup",
        element: <SignUpPage />, 
      },
    ],
  },
    {
    path: "dashboard/",
    element: <DashLayout />, 
    errorElement: <NotFoundPage />, 
    children: [
      {
        path: "",
        element: <DashboardPage />, 
      },
      {
        path: "reports",
        element: <ReportsPage />, 
      },
      {
        path: "users",
        element: (
          <RequireRole allowedRoles={['admin', 'editor']}>
            <UsersPage />
          </RequireRole>
        ),
      },
      {
        path: "articles",
        element: (
          <RequireRole allowedRoles={['admin', 'editor']}>
            <DashArticleListPage />
          </RequireRole>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function RequireRole({ allowedRoles, children }) {
  const role = localStorage.getItem('role');

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
