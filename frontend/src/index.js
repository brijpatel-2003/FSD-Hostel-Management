import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom'
import Router from './Router/router';
// import GlobalErrorHandler from './GlobalErrorHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>  
  <RouterProvider router={Router}/></div>

);



