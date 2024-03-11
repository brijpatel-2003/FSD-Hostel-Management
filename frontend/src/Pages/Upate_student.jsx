import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
const Update_Student = () => {
    let navigate = useNavigate();
    let [f,setF]= useState(false);
   let roomno=null;
    let students={
        reg_no:null,  
        starting_date:null,
         first_name:null,
         last_name:null,
          email:null,
          gender:null,
         contact_no:null,
         address:null,
         city:null,
         pincode:null,
        room_room_no:null,
        
    }
    let {id} = useParams();
    const [student,setStudent] = useState(students);
    let rooms = [{
        room_no:"",
        room_type:"",
       student_capacity:0,
        student_available:0,
        room_fees:0
    }]
    const [room,setRoom]=useState(rooms);
    const handleSlecte2  = (event)=>{
       
        console.log("event changed");
        setStudent(prev=>{return {...prev,["room_room_no"]:event.target.value}})
    }
    const handleChange = (event)=>{
        
      setStudent(prev=>{return {...prev,[event.target.name]:event.target.value}})
    }
    const isFormValid = () => {
        const notify = () => toast.error("Please fill all details")
        // Check if all required fields are filled out
        if (!student.reg_no || !student.starting_date || !student.first_name || !student.last_name || !student.email || !student.gender || !student.contact_no || !student.address || !student.city || !student.pincode || !student.room_room_no ) {
            notify();
            // If any required field is missing, return false
            return false;
        }
        
        // If all required fields are filled out, return true
        return true;
    };
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log("handle submit");
        console.log(student);
       if(!isFormValid()){
        return ;
       }

       
        
        
    

        fetch(`http://localhost:8081/student/addStudent/${student.room_room_no}`,{
        method:'Post',
        headers: {
            'Content-Type': 'application/json', // Specify the content type of the request body
        },
        body: JSON.stringify(student), 
        
       }).then(res =>{
        navigate('/dashboard');
        toast.success("Your Data has been Submited")
        return res
       })
   

    }

    useEffect(()=>{
        fetch("http://localhost:8081/room/validRooms").then(response=>response.json()).then(data=>{
            if(data){
                console.log(data);
                setRoom(data);
                return data;
            }
            else{
                
            }
           
        }).catch(err=>err);

    },[])
    useEffect(()=>{
        fetch(`http://localhost:8081/student/getStudent/${id}`).then(res =>res.json()).then(data =>{
            console.log("datain update",data);
            setStudent(data);
            setF(true);
        })
       
    },[])
    useEffect(()=>{
        fetch(`http://localhost:8081/student/getStudentRoomNum/${id}`).then(res =>res.json()).then(data =>{
            console.log("datain update",data);
            roomno =  data;
            setStudent({...student,['room_room_no']:data});
        })
    },[f])
  return (
    <div>
   
    
    <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

        <Header/>

        <LeftSlider/>

        <div class="page-wrapper" style={{display:"block"}}>

            <div class="page-breadcrumb">
                <div class="row">
                    <div class="col-7 align-self-center">
                        <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Hostel Bookings</h4>
                        <ToastContainer />
                    </div>
                    
                </div>
            </div>

            <div class="container-fluid">

            <form >
                
                <div class="row">

                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Room Number</h4>
                                    <div class="form-group mb-4">
                                        <select class="custom-select mr-sm-2" name="room" id="room" onChange={handleSlecte2} required  >
                                            <option selected>{student.room_room_no}</option>
                                            {room.map((x)=>{
                                                return  <option>{``+x.room_no}</option>
                                            })}
                                        </select>
                                        <span id="room-availability-status" style={{fontSize:'12px'}}></span>
                                    </div>
                              
                            </div>
                        </div>
                    </div>

                
 
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Start Date</h4>
                                    <div class="form-group">
                                        <input type="date" name="starting_date" id="starting_date" class="form-control" onChange={handleChange} value={student.starting_date} required/>
                                    </div>
                                
                            </div>
                        </div>
                    </div>


                  
                
                </div>

                <h4 class="card-title mt-5">Student's Personal Information</h4>

                <div class="row">

                
                    <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Registration Number</h4>
                                        <div class="form-group">
                                            <input type="text" name="reg_no" id="reg_no" placeholder="Enter registration number" class="form-control"onChange={handleChange} disabled value={student.reg_no} required/>
                                        </div>
                                </div>
                            </div>
                        </div>


                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">First Name</h4>
                                    <div class="form-group">
                                        <input type="text" name="first_name" id="first_name" placeholder="Enter first name" onChange={handleChange} value={student.first_name} class="form-control" required/>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Last Name</h4>
                                    <div class="form-group">
                                        <input type="text" name="last_name" id="last_name" placeholder="Enter last name" 
                                        value={student.last_name}
                                        onChange={handleChange} class="form-control" required/>
                                    </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Email</h4>
                                    <div class="form-group">
                                        <input type="email" name="email" id="email"
                                        value={student.email}
                                        onChange={handleChange} placeholder="Enter email address" class="form-control" required/>
                                    </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Gender</h4>
                                    <div class="form-group">
                                    <select name="gender" class="form-control" onChange={handleChange}required="required">
                                        <option value="">{``+student.gender}</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                    </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Contact Number</h4>
                                    <div class="form-group">
                                        <input type="number" name="contact_no" id="contact_no" placeholder="Enter contact number" onChange={handleChange}
                                        value={student.contact_no}
                                        class="form-control" required/>
                                    </div>
                            </div>
                        </div>
                    </div>
                              
                </div>

                    <h4 class="card-title mt-5">Current Address Information</h4>

                    <div class="row">
                    
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Address</h4>
                                        <div class="form-group">
                                            <input type="text" name="address" id="address" class="form-control" onChange={handleChange} value={student.address} placeholder="Enter Address" required/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">City</h4>
                                        <div class="form-group">
                                            <input type="text" name="city" id="city" class="form-control"
                                            value={student.city}
                                             onChange={handleChange} placeholder="Enter City Name" required/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Postal Code</h4>
                                        <div class="form-group">
                                            <input type="text" name="pincode" id="pincode" class="form-control"
                                            value={student.pincode}
                                             onChange={handleChange} placeholder="Enter Postal Code" required/>
                                        </div>
                                </div>
                            </div>
                        </div>

                    
                    </div>


                    <div class="form-actions">
                        <div class="text-center">
                            <button type="submit" onClick={handleSubmit} name="submit" class="btn btn-success">Submit</button>
                            {/* <button type="reset" class="btn btn-dark">Reset</button> */}
                        </div>
                    </div>
                </form>
               
            </div>
        </div>
    </div></div>
  )
}

export default Update_Student