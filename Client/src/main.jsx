import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './routes/Login.jsx';
import Root from  './routes/Root.jsx';
import Index from './Index.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Accounts from './routes/Accounts.jsx';
import Transactions from './routes/Transactions.jsx';
import Reports from './routes/Reports.jsx';
import Settings from './routes/Settings.jsx';
import Budget from './routes/Budget.jsx';
import Register from './routes/Register.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index:true,
        element: <Index />,
      },
      {
        path: '/:username/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/:username/accounts',
        element: <Accounts />,
      },
      {
        path: '/:username/transactions',
        element: <Transactions />,
      },
      {
        path: '/:username/reports',
        element: <Reports />,
      },
      {
        path: '/:username/settings',
        element: <Settings />,
      },
      {
        path: '/:username/budget',
        element: <Budget />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
