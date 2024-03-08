import React, { useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const  Payment= () => {
    let [reg,setReg] = useState(null);
    let [dis,setDis] = useState(false)
    const [payment, setPayment] = useState({
        total_fees: '',
        fees_paid: '',
        pending_fees: '',
        amt: '',
        date:'',
    });
    const validReg = async()=>{
        let result = false;
        if(reg){
          await  fetch(`http://localhost:8081/student/getStudentsReg`).then(res=>res.json()).then(data=>{
                
                if(data){
                    data.forEach(element => {
                        console.log(element);
                        if(element == reg){
                            result = true;
                        }
                    });
                }
            })
        }
       
        return result;
    }

    const makePayment = async(event)=>{
        console.log(event);
       
      //  console.log();
        const stripe = await loadStripe("pk_test_51OegoCSHej2iRk34mVCth3mM82qjys3P2z7J7ySjohCnjJg17lVAbo7qHsn8JpQ3UxcEJM8mPzNw10h0scwRr11q00gHOCIEZe");
    
      
        let paymentInfo = {
            name: "Your Name",
            currency: "INR",
            successUrl: `http://localhost:3000/sucess/${payment.amt}/${reg}`,
            cancelUrl: "http://localhost:3000/cancel",
            amount: payment.amt*100, 
            quantity: 1
        };
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`http://localhost:8081/api/payment`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(paymentInfo)
        });
    
        const session = await response.json();
    
        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }
    const handleRegister = async(event)=>{
        let f =0;
         await validReg().then(data=>{
            if(data){
                setDis(true);
                event.target.disabled = true;
                document.querySelector('#regno').setAttribute('disabled',true);
            }    
        else{
            console.log("wrong");
            f =1;
            toast.error("wrong Registration No.");
            return;
        }
            
        });
        if(f){
            return;
        }
       
        fetch(`http://localhost:8081/payment/getPaymentByStudentID/${reg}`).then(res =>res.json()).then(data=>{
            console.log(data);
            setPayment(data[data.length-1])
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChange2 = (e)=>{
       
       setReg(e.target.value) ;
    }
    const handleClick = ()=>{
        makePayment()
    }
  return (
    <div>
        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

       <Header/>

       <LeftSlider/>

        <div class="page-wrapper" style={{display:"block"}}>
            <ToastContainer/>
            <div class="page-breadcrumb">
                {console.log(payment)}
                <div class="row">
                    <div class="col-7 align-self-center">
                        <h4 class="page-title text-truncate text-dark font-weight-medium mb-1">Fees Payment</h4>
                    </div>
                </div>
            </div>

            <div class="container-fluid">

                <form  >

                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Registration Number</h4>
                                        <div class="form-group">
                                            <input type="number" 
                                            onChange={handleChange2}
                                            name="regno" placeholder="Enter Registration Number" id="regno" class="form-control" required/>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>


                       
                        </div>
                        <div class="form-actions" style={{margin:"20px,0px"}}>
                            
                        </div>
                        </form>
                        <div class="text-center">
                                <button  onClick={handleRegister}name="submit" class="btn btn-success">Register</button>
                                {/* <button type="reset" class="btn btn-danger">Reset</button> */}
                            </div>
                        <form>
                            <div class = "row">


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Total Fees</h4>
                                        <div class="form-group">
                                            <input type="number" 
                                            onChange={handleChange} value={payment.total_fees}
                                            name="total_fees" id="total_fees" placeholder="Enter Middle Name" required class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Fees Paid</h4>
                                        <div class="form-group">
                                            <input type="number" 
                                            onChange={handleChange} value={payment.fees_paid}name="fees_paid" id="fees_paid" placeholder="Fees Paid" required="required" class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>



                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Pending Fees</h4>
                                        <div class="form-group">
                                            <input type="number" name="pending_fees" id="pending_fees" 
                                            onChange={handleChange} value={payment.pending_fees}placeholder="Pending Fees" required="required" class="form-control"/>
                                            <div id="user-availability-status" style={{fontSize:"12px"}}> </div>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Enter Amount</h4>
                                        <div class="form-group">
                                            <input type="number" 
                                            min={1}
                                            max={payment.pending_fees}
                                            name="amt" id="amt" 
                                            onChange={handleChange} value={payment.amt}
                                            placeholder="Enter Amount" 
                                            required="required" class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Enter Date</h4>
                                        <div class="form-group">
                                            <input type="date" name="date" id="amt" 
                                            onChange={handleChange} value={payment.date}
                                            placeholder="Enter Amount" 
                                            required="required" class="form-control"/>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                

                       
                
                </form>
                <div class="form-actions">
                            <div class="text-center">
                                <button onClick={handleClick} 
                               disabled = {!dis}
                                name="submit" class="btn btn-success">Register</button>
                                <button   type="reset" class="btn btn-danger">Reset</button>
                            </div>
                        </div>

            </div>
        </div>
    </div>
    </div>
  )
}

export default Payment