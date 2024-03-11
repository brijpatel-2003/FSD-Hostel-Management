import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { Link, useParams } from 'react-router-dom';
import Student_reg from './Student_reg';
let payments = [
    {
     pid:0,
      total_fees: 0,
      fees_paid:0 ,
      pending_fees: 0,
      date: "2022-01-01",
    },
    // Add more payment objects as needed
  ];
let i = 0;
let amt=0;
const Student_list = () => {
    let {id} = useParams();
    const [payment,setPayment] = useState(payments);
    useEffect(()=>{
        fetch(`http://localhost:8081/payment/getPaymentByStudentID/${id}`).then(res=>res.json()).then(data=>{
            console.log("here",data);
                setPayment(data);
                i = 0;
                amt=0;
        })
       },[])
    
    
   
    

    return (
        <div><div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
            <Header />

            <LeftSlider />
           
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
                                                    <th>Payment No.</th>
                                                    <th>Total Payments</th>
                                                    <th>Fees paid</th>
                                                    <th>Pending Fees</th>
                                                    <th>Amount Paid</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {payment.map((payment) => {
                                                    
                                                    console.log(payment);
                                                    return (<tr><td>{++i}</td>

                                                        <td id = "id">{payment.pid}</td>
                                                        <td>{payment.total_fees}</td>
                                                        <td>{payment.fees_paid}</td>
                                                        <td>{payment.pending_fees}</td>
                                                        <td>{payment.fees_paid - amt}</td>
                                                        <td>{payment.date.toString().split('T')[0]}</td>
                                                        
                                                        
                                                          <td hidden={true}> {amt = payment.fees_paid}</td>
                                                    </tr>)
                                                })
                                                // {amt = payment.}
                                                }

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

export default Student_list;