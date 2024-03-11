import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  
    let play = ()=>{
     
    }
    
    const handleClick = ()=>{
        navigate('/dashboard');
    }
  
   
  useEffect(() => {
    play()
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/');
    console.log(urlSegments);
   let amount = urlSegments[4];
   let studentid = urlSegments[5];

   function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}




    const createPayment = async()=>{
        fetch(`http://localhost:8081/payment/getPaymentByStudentID/${studentid}`).then(res =>res.json()).then(data=>{
            if(!data){  
            }
            let payment = 
                {
                   
                    total_fees: 1000,
                    fees_paid: 500,
                    pending_fees: 500,
                    date: "2024-03-01"
                }
                data = data[data.length-1];
                payment.total_fees = data.total_fees;
                payment.fees_paid = data.fees_paid;
                payment.pending_fees = data.pending_fees;
           
            
            payment.date =formatDate(new Date());
           
            payment.fees_paid = parseInt(payment.fees_paid) + parseInt(amount);
            payment.pending_fees = parseInt( payment.total_fees) - parseInt( payment.fees_paid) ;
            console.log(payment);
            fetch(`http://localhost:8081/payment/addPayment/${studentid}`,{
                method: 'POST', // Assuming you're adding a room and following RESTful conventions
                headers: {
                    'Content-Type': 'application/json', // Specify the content type of the request body
                },
                body: JSON.stringify(payment), // Pass the room object as JSON string in the request body
            })
        })
       
 
    }
    createPayment();
   
  }, []);

  return (
    <div>
        <div class="vh-100 d-flex justify-content-center align-items-center">
    <div>
        <div class="mb-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-success bi bi-check-circle-fill" width="75" height="75"
                fill="currentColor" 
                 viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
        </div>
        <div class="text-center">
            <h1>Payment Done !</h1>
            <p>Thank you for completing your online secure payment.  
                <br></br><b>Have a great day!</b> </p>
          
           <button class="btn btn-primary" onClick={handleClick}>Back Home</button>
        </div>
    </div>
    </div>
    </div>
    

  );
}

export default SuccessPage;
