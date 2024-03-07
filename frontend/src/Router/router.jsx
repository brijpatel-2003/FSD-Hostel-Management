import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",          // Define the route for "/"
        element: <App />
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    
  
    
]);

  
export default router;