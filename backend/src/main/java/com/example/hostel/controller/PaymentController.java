package com.example.hostel.controller;

import com.example.hostel.entity.Payment;
import com.example.hostel.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @GetMapping("/getPayment")
    List<Payment> getPayments(){return paymentService.getPayments();}
    @GetMapping("/getPaymentByStudentID/{id}")
    List<Payment> getPaymentByStudentId(@PathVariable Long id){return paymentService.getStudentPayments(id);}
    @PostMapping("/addPayment/{id}")
    ResponseEntity<HttpStatus> addPayment(@RequestBody Payment payment,@PathVariable("id") Long id){
        try{
            paymentService.addPayment(payment,id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/deletePayment/{id}")
    ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id){
        try{
           paymentService.deletePayment(id);
            return new  ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }
}
