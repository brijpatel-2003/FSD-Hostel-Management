import React, { useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { ToastContainer, toast } from 'react-toastify'
let rooms = {
    room_no:null,
    room_type:null,
   student_capacity:null,
    student_available:-1,
    room_fees:null
}
const Register_rooms = () => {
    
    
    const [room,setRoom]=useState(rooms);
    let exist = false;
    let  validateRooms =  async()=>{
        // Check if any property is null
        for (const key in room) {
            if(key === 'student_available'){
                continue;
            }
            if (room.hasOwnProperty(key) && room[key] === null || room[key] <= 0  ) {
                return false; // If any property is null, return false
            }

        }
        let flag =false;
        await  fetch(`http://localhost:8081/room/getRoomNo/${room.room_no}`).then(res=>res.json()).then(data =>{
         
              if(data){
                  toast.error("Reg No. already exist")
                  exist = true;
                  
              }
              else {
                  flag = true;
              }
          })
          // If all required fields are filled out, return true
          return flag;
  
      
    }
    let handleReset = (event)=>{
        window.location.reload();
    }
    let handleSubmit = async(event)=>{
       console.log("data3",room);
       let check = await validateRooms();
       console.log(check);
        if(!check){
           
            setRoom({
                room_no:0,
                room_type:'',
               student_capacity:0,
                student_available:-1,
                room_fees:0
            });
            if(!exist)
            toast.error("Please Fill all Details and No value should less than equal zero");
            return;
        }
        console.log("here");
        room.student_available=0;
      
       fetch("http://localhost:8081/room/addRoom", {
        method: 'POST', // Assuming you're adding a room and following RESTful conventions
        headers: {
            'Content-Type': 'application/json', // Specify the content type of the request body
        },
        body: JSON.stringify(room), // Pass the room object as JSON string in the request body
    }).then(response=>{response.json()
        toast.success("Your Data has been Submited ");
       
    }).then(data=>{
        setRoom({
            room_no:0,
            room_type:'',
           student_capacity:0,
            student_available:0,
            room_fees:0
        });
    return data;
    }).catch(err=>err);
    // setRoom(rooms)
    }
    let handleChange = (event)=>{
        setRoom((prev)=>{return {...prev,[event.target.name]:event.target.value}})
    //    fetch("http://localhost:8081/menu/addRoom").then().then().catch();
    }
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
                        <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Register room</h4>
                        <ToastContainer/>
                    </div>
                </div>
            </div>

            <div class="container-fluid">

                <form  >



        <div className='row'>
  
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Room No</h4>
                                        <div class="form-group">
                                            <input type="number" name="room_no" id="room_no" placeholder="Enter Room No" required class="form-control" value={room.room_no} onChange={handleChange}/>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Student Capacity</h4>
                                        <div class="form-group">
                                            <input type="number" name="student_capacity" placeholder="Enter Registration Number" 
                                            
                                            id="student_capacity" class="form-control"
                                             onChange={handleChange} value={room.student_capacity}
                                              required/>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Available Student</h4>
                                        <div class="form-group">
                                            <input type="number" 
                                            disabled name="student_available" id="student_available" placeholder="Enter Name" 
                                            value={0}
                                            // onChange={handleChange}
                                            required class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Room Type</h4>
                                        <div class="form-group">
                                            <input type="text" name="room_type" id=" room_type" placeholder="Enter Room Type"
                                            onChange={handleChange}
                                            value={room.room_type}
                                             required class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Room Fees (year)</h4>
                                        <div class="form-group">
                                            <input type="number" name="room_fees" id="room_fees" placeholder="Enter Middle Name" required class="form-control"
                                            value={room.room_fees} onChange={handleChange}/>
                                        </div>
                                </div>
                            </div>
                        </div>
        </div>

                        
        
                       
                
                </form>

                <div class="form-actions">
                            <div class="text-center">
                                <button type="submit" onClick={handleSubmit} name="submit" class="btn btn-success">Register</button>
                                <button type="reset"  onClick = {handleReset}class="btn btn-danger">Reset</button>
                            </div>
                        </div>  
            </div>
        </div>
    </div>
   
    </div>
  )
}

export default Register_rooms