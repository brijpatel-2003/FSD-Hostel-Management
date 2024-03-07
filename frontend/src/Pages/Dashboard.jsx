import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import PageTable from '../component/PageTable'




let rooms = [{
    room_no:null,
    room_type:"",
   student_capacity:null,
    student_available:null,
    room_fees:null,
    
}]
const Dashboard = () => {

   
   let i=0;
    let [student,setStudent]=useState(0);
    let [allroom,setAllRoom]=useState(0);
    let [room,setRoom]=useState(0);
    let [roomdata,setRoomData] = useState(rooms);
    useEffect(()=>{
         fetch("http://localhost:8081/student/getStudentCount").then(res=>res.json()).then(data=>{
           
             setStudent(data);
           return  data;
        }).catch(err=>err)
        fetch("http://localhost:8081/room/getRoomCount").then(res=>res.json()).then(data=>{
           
            setAllRoom(data);
           return  data;
        }).catch(err=>err)
        fetch("http://localhost:8081/room/getFilledRoomCount").then(res=>res.json()).then(data=>{
           
       setRoom(data);

       i=0;
       fetch("http://localhost:8081/room/validRooms").then((response)=>{return response.json(); }).then(data=>{
        data.map((x) =>{
            x.student_available = x.studentList.length;
        })
      
        setRoomData(data)
       
       ;return data}).catch(err=>err)

      return  data;
   }).catch(err=>err)
    },[])
  
  
    return (
        <div>
       {/* //       <GlobalErrorHandler/>
       //    <div class="preloader">
       //     <div class="lds-ripple">
       //         <div class="lds-pos"></div>
       //         <div class="lds-pos"></div>
       //     </div>
       // </div> */}
   
       <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
           data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
   
           <Header/>
          
           <LeftSlider/>
           {/* https://hostel-management-olive.vercel.app/rooms */}
   
           <div class="page-wrapper" style={{display:'block'}}>
               <div class="page-breadcrumb">
                   <div class="row">
                       <div class="col-7 align-self-center">
                          <h2>Welcome, Admin!</h2>
                       </div>
                   </div>
               </div>
               <div class="container-fluid">
                   <div class="card-group">
                       <div class="card border-right">
                           <div class="card-body">
                               <div class="d-flex d-lg-flex d-md-block align-items-center">
                                   <div>
                                       <div class="d-inline-flex align-items-center">
                                           <h2 class="text-dark mb-1 font-weight-medium">{student}</h2>
                                   
                                       </div>
                                       <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Registered Students</h6>
                                   </div>
                                   <div class="ml-auto mt-md-3 mt-lg-0">
                                       <span class="opacity-7 text-muted"><i data-feather="user-plus"></i></span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="card border-right">
                           <div class="card-body">
                               <div class="d-flex d-lg-flex d-md-block align-items-center">
                                   <div>
                                       <h2 class="text-dark mb-1 w-100 text-truncate font-weight-medium">{allroom}</h2>
                                       <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Total Rooms
                                       </h6>
                                   </div>
                                   <div class="ml-auto mt-md-3 mt-lg-0">
                                       <span class="opacity-7 text-muted"><i data-feather="grid"></i></span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="card border-right">
                           <div class="card-body">
                               <div class="d-flex d-lg-flex d-md-block align-items-center">
                                   <div>
                                       <div class="d-inline-flex align-items-center">
                                           <h2 class="text-dark mb-1 font-weight-medium">{room}</h2>
                                       </div>
                                       <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Booked Rooms</h6>
                                   </div>
                                   <div class="ml-auto mt-md-3 mt-lg-0">
                                       <span class="opacity-7 text-muted"><i data-feather="book-open"></i></span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
   
                   {/* <div class="col-12">
                       <div class="card">
                           <div class="card-body">
                               <div class="table-responsive">
                                   <table id="zero_config" class="table table-striped table-bordered no-wrap">
                                     
                                       <thead>
                                           <tr>
                                               <th scope="col">#</th>
                                               <th scope="col">Student's Email</th>
                                               <th scope="col">Last Activity</th>
                                           </tr>
                                           <tr>
                                             
                                           <td scope="col">1</td>
                                               <td scope="col">brij@gmail.com</td>
                                               <td scope="col">Admission</td>
                                           </tr>
                                       </thead>
                                       <tbody>
                                           
                                       </tbody>
                                   </table>
                                   <ul class="pagination"><li class="paginate_button page-item previous disabled" id="zero_config_previous"><a href="#" aria-controls="zero_config" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item next disabled" id="zero_config_next"><a href="#" aria-controls="zero_config" data-dt-idx="1" tabindex="0" class="page-link">Next</a></li></ul>
                               </div>
                           </div>
                       </div>
                   </div> */}
    
                   <h3>Empty rooms</h3>
<PageTable data = {roomdata}/>




 
               </div>
           </div>
       </div>
        </div>
       );
  
}

export default Dashboard

