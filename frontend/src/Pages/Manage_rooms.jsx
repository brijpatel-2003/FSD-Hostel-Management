import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { Link } from 'react-router-dom';
let rooms = [{
    room_no:null,
    room_type:"",
   student_capacity:null,
    student_available:null,
    room_fees:null,
    studentList:[],
}]
let i=0;
const Manage_rooms = () => {
    const [room,setRoom]=useState(rooms);
    const handleClick = ()=>{

    }
    const handleDelete  = (event)=>{

      let id =event.target.parentNode.parentNode.parentNode.querySelector("#id").innerHTML 
        fetch("http://localhost:8081/room/deleteRoom/"+id,{
            method:"Delete"
        }).then((response)=>{return response.json(); }).then(data=>{setRoom(data);return data}).catch(err=>err)
        window.location.reload();
        
    }
    useEffect(()=>{
        i=0;
        fetch("http://localhost:8081/room/getRooms").then((response)=>{return response.json(); }).then(data=>
        {   
            
            setRoom(data);return data}).catch(err=>err)
    },[])
  return (
    <div> <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

    <Header/>

    <LeftSlider/>

    <div class="page-wrapper" style={{display:"block"}}>
        <div class="page-breadcrumb">
            <div class="row">
                <div class="col-7 align-self-center">
                    <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Rooms Management</h4>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                        <hr/>
                            <div class="table-responsive">
                                <table id="zero_config" class="table table-striped table-hover table-bordered no-wrap">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Room No.</th>
                                            <th>Type</th>
                                            <th>Fees</th>
                                            <th>student_capacity</th>
                                            <th>student_available</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log("room",room)}
                                        {
                                        room.map((x)=>{return (
                                             <tr>
                                             <td>{++i}</td>
                                             <td id="id">{x.room_no}</td>
                                             <td>{x.room_type}</td>
                                             <td>{x.room_fees}</td>
                                            
                                             <td>{x.student_capacity}</td>
                                             <td>{x.studentList.length}</td>
                                             <td  >
                                                <Link to ={`../student_list/${x.room_no}`}>  <button type="submit" name="submit" 
                                             onClick={handleClick}
                                             class="btn  custom-button" title='View Students' style={{backgroundColor: '#1c2d41',color:'white'}}>Studnets</button>
                                                
                                                </Link>
                                           
                                                {/* <Link to = {`/update_room/${x.room_no}`}><a href="#" title="Edit"><i class="icon-note"></i></a></Link> */}
                                                &nbsp;&nbsp;
                                             <a onClick={handleDelete} href="#" title="Delete"><i class="icon-close" style={{Color:"red;"}}></i></a></td>   
                                         </tr>)
                                        })}
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Manage_rooms