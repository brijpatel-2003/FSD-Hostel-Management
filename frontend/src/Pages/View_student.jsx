import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { Link } from 'react-router-dom';
let student = [{
    address: "",
    city: "",
    contact_no: 1,
    email: "",
    first_name: "brij",
    gender: "Male",
    last_name: "patel",
    pincode: 1,
    reg_no: 1,
    room_no: 1,
    starting_date: ""
}]
let i = 0;
const View_student = () => {
    let handelDelete = (event)=>{
       
        let id =event.target.parentNode.parentNode.parentNode.querySelector("#id").innerHTML 
        console.log(id);
        fetch(`http://localhost:8081/student/deleteStudent/${id}`,{
            method:"DElETE"
        }).then((response)=>{return response.json(); }).then(data=>{return data;}).catch(err=>err)
         window.location.reload();
    }
    useEffect(() => {
        i = 0;
        fetch("http://localhost:8081/student/getStudent")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
               
                setInfo(data);
                // console.log("data", data);

              
                return data;
            }).catch((err) => { console.log(err) })
    }, []);
    const [info, setInfo] = useState(student)

    return (
        <div><div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
            <Header />

            <LeftSlider />
            {console.log(info)}
            <div class="page-wrapper" style={{ display: "block" }}>
                <div class="page-breadcrumb">
                    <div class="row">
                        <div class="col-7 align-self-center">
                            <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Student's Account</h4>
                        </div>
                    </div>
                </div>

                <div class="container-fluid">

                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-subtitle">Displaying all the registered student's account.</h6>
                                    <div class="table-responsive">
                                        <table id="zero_config" class="table table-striped table-hover table-bordered no-wrap">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Reg. No.</th>
                                                    <th>Student's Name</th>
                                                    <th>Gender</th>
                                                    <th>Contact</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {info.map((info) => {
                                                    console.log(info);
                                                    return (<tr><td>{++i}</td>

                                                        <td id = "id">{info.reg_no}</td>
                                                        <td>{info.first_name + " " + info.last_name}</td>
                                                        <td>{info.gender}</td>
                                                        <td>{info.contact_no}</td>
                                                        <td>{info.email}</td>
                                                        <td  >
                                                        
                                                            <Link to = {`../update_student/${info.reg_no}`}><a href="#" title="Edit"><i class="icon-note"></i></a></Link>
                                                            &nbsp;&nbsp;
                                                            <a href="#" onClick={handelDelete} title="Delete"><i class="icon-close" style={{ Color: "red;" }}></i></a></td>
                                                    </tr>)
                                                })}

                                                {/* <td><a href="#" title="Delete Record"></a><i class="icon-close" style="color:red;"></i></a></td> */}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default View_student