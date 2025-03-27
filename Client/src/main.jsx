import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from  './routes/Root.jsx';
import Index from './Index.jsx';
import Dashboard from './routes/Dashboard.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index:true,
        element: <Index />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
