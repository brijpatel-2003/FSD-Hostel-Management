import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Payment from "../Pages/Payment";
import Student_reg from "../Pages/Student_reg";
import Dashboard from "../Pages/Dashboard";
import Manage_rooms from "../Pages/Manage_rooms";
import Mess_menu from "../Pages/Mess_menu";
import View_student from "../Pages/View_student";
import Register_rooms from "../Pages/Register_rooms";
import Update_rooms from "../Pages/Update_rooms";
import Update_Student from "../Pages/Upate_student";
import Student_list from "../Pages/Student_list";
import SuccessPage from "../Pages/SuccessPage";
const router = createBrowserRouter([
    {
        path: "/",          // Define the route for "/"
        element: <App />
    },
    {
        path: "/payment",    // Define the route for "/payment"
        element: <Payment />
    },
    {
        path: "/student_reg",  // Define the route for "/student_reg"
        element: <Student_reg />
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/manage_room",
        element:<Manage_rooms/>
    },{
        path:"/mess_menu",
        element:<Mess_menu/>
    },{
      path:"/view_student",
      element:<View_student/>
    },{
        path:"/register_room",
        element:<Register_rooms/>
    },
    {
        path:"/update_room/:id",
        element:<Update_rooms/>
    },   
    {
        path:"/update_student/:id",
        element:<Update_Student/>
    },   
    {
        path:"/student_list/:id",
        element:<Student_list/>
    },
    {
        path:"/sucess/:amt/:id",
        element:<SuccessPage/>
    }
    
]);

  
export default router;