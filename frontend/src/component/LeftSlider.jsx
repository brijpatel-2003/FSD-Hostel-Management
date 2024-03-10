import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
// import '../slidebar.css'
const LeftSlider = () => {

 
  const location = useLocation();
    const applyStyles = (id) => {
      const elements = document.getElementsByClassName("sidebar-item");
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ''; // Reset styles for all elements
      }
      let element,elemente;
      switch (id) {
      
        case 'dashboard' :
        element = document.querySelector(".a");
        elemente = document.querySelector(".hide-menu");
        element.style.backgroundColor='#FFEE58';
        
        // element.style.color = 'white'; 
          break;
          case 'student_reg' :
            element = document.querySelector(".b");
            element.style.backgroundColor='blue';
       
        element.style.backgroundColor='#FFEE58';
     
              break;
              case 'payment' :
        element = document.querySelector(".c");
        element.style.backgroundColor='#FFEE58';
          break;
          case 'view_student' :
        element = document.querySelector(".d");
        element.style.backgroundColor='#FFEE58';
          break;
          case 'manage_room' :
        element = document.querySelector(".e");
        element.style.backgroundColor='#FFEE58';
          break;
          case'register_room':
          element = document.querySelector(".g");
          element.style.backgroundColor='#FFEE58';
          break;

        default:
        element = document.querySelector(".f");
          element.style.backgroundColor='#FFEE58';
          break;
      }
    
    };
    
    useEffect(() => {
      // Apply styles based on the initial URL path when component mounts
      const pathname = location.pathname;
      const currentPage = pathname.split('/')[1];
      applyStyles(currentPage);
     
    }, [location.pathname]);
  // useEffect(() => {
  //   // Apply styles when the component mounts or when mode changes
  // applyStyles(id);
  // }, [id]); 
  
  return (
    <div>
      <aside class="left-sidebar" data-sidebarbg="skin6">

      <div class="scroll-sidebar" data-sidebarbg="skin6">
        <nav class="sidebar-nav">

          <ul id="sidebarnav">

            <li class="sidebar-item a" id="1"style={{}}> <Link to={"/dashboard"}><a class="sidebar-link sidebar-link" href="#" aria-expanded="false">
            <i class="fa fa-home" aria-hidden="true"></i>
              <span class="hide-menu">Dashboard</span></a></Link></li>
            <li class="list-divider "></li>
            <li class="nav-small-cap"><span class="hide-menu">Features</span></li>

            <li class="sidebar-item b" >
              <Link to={"/student_reg"}> <a class="sidebar-link sidebar-link" href="reg_student.html"
                aria-expanded="false">  <i class="fas fa-user-plus"></i><span
                  class="hide-menu">Register Student</span></a></Link>

            </li>

            <li class="sidebar-item g" >
              <Link to={"/register_room"}> <a class="sidebar-link sidebar-link" href="reg_student.html"
                aria-expanded="false">   
              <i class="fa fa-registered" aria-hidden="true"></i>
                <span
                  class="hide-menu">Register Rooms</span></a></Link>

            </li>

            <li class="sidebar-item c">
              <Link to={"/payment"}> <a class="sidebar-link sidebar-link" href="student_login.html"
              aria-expanded="false"><i class="fas fa-h-square"></i><span
                class="hide-menu">Fess Payment</span></a></Link></li>

            <li class="sidebar-item d">
               <Link to={"/view_student"}><a class="sidebar-link sidebar-link" href="view_student.html"
              aria-expanded="false"><i class="fas fa-user-circle"></i><span
                class="hide-menu">View Student Acc.</span></a></Link></li>

            <li class="sidebar-item e"> <Link to={"/manage_room"}><a class="sidebar-link sidebar-link" href="manage_rooms.html"
              aria-expanded="false"><i class="fas fa-bed"></i><span
                class="hide-menu">Manage Rooms</span></a></Link></li>

            <li class="sidebar-item f"><Link to={"/mess_menu"}> <a class="sidebar-link sidebar-link" href="mess_menu.html"
              aria-expanded="false"><i class="fas fa-book"></i><span
                class="hide-menu">Mess Menu</span></a></Link></li>

          </ul>
        </nav>
      </div>
    </aside>
     
      
    </div>
    
  )
}

export default LeftSlider