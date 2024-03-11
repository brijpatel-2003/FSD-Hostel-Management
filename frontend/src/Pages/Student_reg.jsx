import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Student_reg = () => {
   
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
       
     
        setStudent(prev=>{return {...prev,["room_room_no"]:event.target.value}})
    }
    const handleChange = (event)=>{
      setStudent(prev=>{return {...prev,[event.target.name]:event.target.value}})
    }
    const isFormValid = async() => {
        const notify = () => toast.error("Please fill all details")
        // Check if all required fields are filled out
        if (!student.reg_no || !student.starting_date || !student.first_name || !student.last_name || !student.email || !student.gender || !student.contact_no || !student.address || !student.city || !student.pincode || !student.room_room_no) {
            
            notify();
            // If any required field is missing, return false
            return false;
        }
        let flag =false;
      await  fetch(`http://localhost:8081/student/getStudentregno/${student.reg_no}`).then(res=>res.json()).then(data =>{
       
            if(data){
                toast.error("Reg No. already exist")
                
            }
            else {
                flag = true;
            }
        })
        // If all required fields are filled out, return true
        return flag;
    };
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
    let check = await  isFormValid();
   
       if(!check){
        
        return ;
       }
      
         fetch(`http://localhost:8081/student/addStudent/${student.room_room_no}`,{
        method:'Post',
        headers: {
            'Content-Type': 'application/json', // Specify the content type of the request body
        },
        body: JSON.stringify(student), 
        
       }).then(res =>{
        fetch(`http://localhost:8081/room/getRoom/${student.room_room_no}`).then(res=>res.json()).then(data=>{
            console.log(data.room_fees);
            let payment = 
                {
                   
                    total_fees: data.room_fees,
                    fees_paid: 0,
                    pending_fees: data.room_fees,
                    date:formatDate(new Date())
                }
                fetch(`http://localhost:8081/payment/addPayment/${student.reg_no}`,{
                method: 'POST', // Assuming you're adding a room and following RESTful conventions
                headers: {
                    'Content-Type': 'application/json', // Specify the content type of the request body
                },
                body: JSON.stringify(payment), // Pass the room object as JSON string in the request body
            })
        })
        toast.success("Your Data has been Submited")
        return res
       })
       
       window.location.reload();

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
                                        <select class="custom-select mr-sm-2" name="room" id="room" onChange={handleSlecte2} required >
                                            <option selected>Select...</option>
                                            {room.map((x)=>{
                                                return  <option>{x.room_no}</option>
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
                                        <input type="date" name="starting_date" id="starting_date" class="form-control" onChange={handleChange} required/>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
{/* 
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Room Type</h4>
                                    <div class="form-group">
                                        <input type="text" name="rtype"  id="rtype" placeholder="Room Type" required class="form-control"/>
                                    </div>
                            </div>
                        </div>
                    </div> */
}
                  
                
                </div>

                <h4 class="card-title mt-5">Student's Personal Information</h4>

                <div class="row">

                
                    <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Registration Number</h4>
                                        <div class="form-group">
                                            <input type="number" name="reg_no" id="reg_no" placeholder="Enter registration number" class="form-control"onChange={handleChange}  required />
                                        </div>
                                </div>
                            </div>
                        </div>


                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">First Name</h4>
                                    <div class="form-group">
                                        <input type="text" name="first_name" id="first_name" placeholder="Enter first name" onChange={handleChange} class="form-control" required/>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Last Name</h4>
                                    <div class="form-group">
                                        <input type="text" name="last_name" id="last_name" placeholder="Enter last name" onChange={handleChange} class="form-control" required/>
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
                                        <option value="">Select Gender</option>
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
                                        <input type="number" name="contact_no" id="contact_no" placeholder="Enter contact number" onChange={handleChange} class="form-control" required/>
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
                                            <input type="text" name="address" id="address" class="form-control" onChange={handleChange} placeholder="Enter Address" required/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">City</h4>
                                        <div class="form-group">
                                            <input type="text" name="city" id="city" class="form-control" onChange={handleChange} placeholder="Enter City Name" required/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Postal Code</h4>
                                        <div class="form-group">
                                            <input type="number" name="pincode" id="pincode" class="form-control" onChange={handleChange} placeholder="Enter Postal Code" required/>
                                        </div>
                                </div>
                            </div>
                        </div>

                    
                    </div>


                    <div class="form-actions">
                        <div class="text-center">
                            <button type="submit" onClick={handleSubmit} name="submit" class="btn btn-success">Submit</button>
                            <button type="reset" class="btn btn-dark">Reset</button>
                        </div>
                    </div>
                </form>
               
            </div>
        </div>
    </div></div>
  )
}

export default Student_reg