package com.example.hostel.services;

import com.example.hostel.dao.PaymentDao;
import com.example.hostel.dao.StudentDao;
import com.example.hostel.entity.Payment;
import com.example.hostel.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    PaymentDao paymentDao;
    @Autowired
    StudentDao studentDao;
    public List<Payment> getPayments(){return paymentDao.findAll();}
    public List<Payment> getStudentPayments(Long id){
        List<Payment> list  = paymentDao.findAll();
        List<Payment> payments = new ArrayList<>();
        for(Payment p:list){
            if(p.getStudent().getReg_no() == id){
                payments.add(p);
            }
        }
        return payments;
    }
    public void addPayment(Payment p,Long id){
        Optional<Student> s = studentDao.findById(id);
        if(s.isPresent()){
            Student student = s.get();
            p.setStudent(student);
            paymentDao.save(p);
            List<Payment> plist = student.getPayments();
            plist.add(p);
            student.setPayments(plist);
          studentDao.save(student) ;
        }
    }
    public void deletePayment(long id){
        paymentDao.deleteById(id);
    }
}
