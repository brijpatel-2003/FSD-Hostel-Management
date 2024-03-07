import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",          // Define the route for "/"
        element: <App />
    },
  
    
]);

  
export default router;