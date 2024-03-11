import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'

import { Link, useNavigate, useParams } from 'react-router-dom';
let rooms = {
    room_no:0,
    room_type:"",
   student_capacity:0,
    student_available:0,
    room_fees:0
}
const Update_rooms = () => {
    const navigate = useNavigate();
    let {id} = useParams();
    const [room,setRoom]=useState(rooms);
    useEffect(()=>{
        fetch("http://localhost:8081/room/getRoom/"+id).
        then(response=>response.json()).then(data=>{setRoom(data);return data;}).catch(err=>err);
    },[])
    let handleSubmit = (event)=>{
       console.log("here",room);
       fetch("http://localhost:8081/room/updateRoom", {
        method: 'PUT', // Assuming you're adding a room and following RESTful conventions
        headers: {
            'Content-Type': 'application/json', // Specify the content type of the request body
        },
        body: JSON.stringify(room), // Pass the room object as JSON string in the request body
    }).then(response=>response.json()).then(data=>data).catch(err=>err);
    setRoom(rooms)
  navigate("/manage_room");
  window.location.reload();
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
                    <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Fees Payment</h4>
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
                                        <input type="text" name="room_no" id="room_no" disabled placeholder="Enter Room No" required class="form-control" value={room.room_no} onChange={handleChange}/>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Student Capacity</h4>
                                    <div class="form-group">
                                        <input type="text" name="student_capacity" placeholder="Enter Registration Number" id="student_capacity" class="form-control" onChange={handleChange} value={room.student_capacity} required/>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Available Student</h4>
                                    <div class="form-group">
                                        <input type="text" name="student_available" id="student_available" defaultValue ="0"placeholder="Enter Name" 
                                        value={room.student_available}
                                        onChange={handleChange}
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
                                <h4 class="card-title">Room Fees</h4>
                                    <div class="form-group">
                                        <input type="text" name="room_fees" id="room_fees" placeholder="Enter Middle Name" required class="form-control"
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
                            <button type="reset" class="btn btn-danger">Reset</button>
                        </div>
                    </div>
        </div>
    </div>
</div>

</div>
  )
}

export default Update_rooms