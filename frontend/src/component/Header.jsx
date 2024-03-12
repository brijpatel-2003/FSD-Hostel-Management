import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const handleClick = ()=>{
        localStorage.removeItem('check')
    }
  return (
    <div><header class="topbar" data-navbarbg="skin6">
    <nav class="navbar top-navbar navbar-expand-md">
        <div class="navbar-header" data-logobg="skin6">

            <a class="nav-toggler waves-effect waves-light d-block d-md-none" href='#'><i
                    class="ti-menu ti-close"></i></a>
            <div class="navbar-brand">
                <a href="dashboard.html">
                    <b class="logo-icon">
                        <img src="../assets/images/logo-icon-nav.png" alt="homepage" class="dark-logo" />
                        <img src="../assets/images/logo-icon-nav.png" alt="homepage" class="light-logo" />
                    </b>
                    <span class="logo-text">
                        <img src="../assets/images/logo-text-nav.png" alt="homepage" class="dark-logo" />
                        <img src="../assets/images/logo-light-text.png" class="light-logo" alt="homepage" />
                    </span>
                </a>
            </div>
            <a class="topbartoggler d-block d-md-none waves-effect waves-light" href="#"
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                    class="ti-more"></i></a>
        </div>
        <div class="navbar-collapse collapse" id="navbarSupportedContent">
            <ul class="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
            <ul class="navbar-nav float-right">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img src="../assets/images/users/admin-icn.png" alt="user" class="rounded-circle"
                            width="35"/>
                        
                            
    
                        <span class="ml-2 d-none d-lg-inline-block"><span>Hello,</span> 
                        <span class="text-dark">Admin</span> 
                        <i data-feather="chevron-down" class="svg-icon"></i></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                        <Link to ='/'><a class="dropdown-item" href=""  onClick={handleClick}><i data-feather="power" class="svg-icon mr-2 ml-1"></i> Logout</a></Link>
                          
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header></div>
  )
}

export default Header