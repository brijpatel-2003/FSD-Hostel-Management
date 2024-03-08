import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  let user = {
    username:'',
    password:''
  }
  const [data,setData] = useState(user);
  const navigate = useNavigate()
  let handleSubmit = (event) => {
      if(data.username === 'admin' && data.password === 'admin'){
        toast.success("Logged in Success");
        navigate('/dashboard')
      }
      else{
        toast.error("Usernamr or Password Invalid")
      }
    console.log(data);
  }
  let handleChange = (event) => {
 
    setData(prev=>{
      return ({...prev,[event.target.name]:event.target.value})
    })
    
  } 
  return (
    <div className="main-wrapper">

    <ToastContainer/>
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative" style={{ background: 'url(../assets/images/big/auth-bg.jpg) no-repeat center center', height: "630px" }}>
        <div className="auth-box row">
          <div className="col-lg-7 col-md-5 modal-bg-img" style={{ backgroundImage: 'url(../assets/images/adimg.jpg)' }}></div>
          <div className="col-lg-5 col-md-7 bg-white">
            <div className="p-3">
              <div className="text-center">
                <img src={"../assets/images/big/icon.png"} alt="wrapkit" />
              </div>
              <h2 className="mt-3 text-center">Admin Login</h2>
              
              <form className="mt-4" >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="text-dark" htmlFor="uname">Email or Username</label>
                      <input className="form-control" name="username"  onChange = {handleChange} value = {data.username}id="uname" type="text" placeholder="Email or Username" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="text-dark" htmlFor="pwd">Password</label>
                      <input  onChange ={handleChange}className="form-control" value={data.password} name="password" id="pwd" type="password" placeholder="Enter your password" required />
                    </div>
                  </div>
                  
                 
                </div>
              </form>
              <div className="col-lg-12 text-center">
                    <button  onClick={handleSubmit} name="login" className="btn btn-block btn-danger">LOGIN</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

