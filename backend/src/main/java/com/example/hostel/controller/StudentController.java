package com.example.hostel.controller;

import com.example.hostel.entity.Room;
import com.example.hostel.entity.Student;
import com.example.hostel.services.RoomService;
import com.example.hostel.services.StudentService;
import org.aspectj.lang.annotation.DeclareWarning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    StudentService studentService;
    @Autowired
    RoomService roomService;
    @RequestMapping("/getStudent")
    List<Student>  regStudentHandler(){
       return studentService.getStudents();
    }
    @RequestMapping("/getStudentRoomNum/{id}")
    Long getStudentRoom(@PathVariable("id") Long id){
       Room r =  roomService.getStudentRoom(id);
       if(r == null){
           return -1L;
       }
        return r.getRoom_no() ;
    }
    @RequestMapping("/getStudentregno/{id}")
    Boolean getStudentRegno(@PathVariable("id") Long id){
       return  studentService.isPresent(id);
    }
    @RequestMapping("/getStudentCount")
    Long getStudents(){
        return (long) studentService.getStudents().size();
    }
    @RequestMapping("/getStudentsReg")
    List<Long> getStudentReg(){
        List<Student> s = studentService.getStudents()  ;
        List<Long> list = new ArrayList<>();
        for(Student i:s){
           list.add(i.getReg_no());
        }
        return list;
    }
    @RequestMapping("/getStudent/{id}")
    Student getStudent(@PathVariable long id){
        return studentService.getStudent(id);
    }
    @PostMapping("/addStudent/{id}")
    Student addStudent(@RequestBody Student s,@PathVariable("id") Long id){
       studentService.addStudent(s,id);
        return s;
    }
    @PostMapping("/addStudent")
    Student addStudent(@RequestBody Student s){
        studentService.addStudent(s);
        return s;
    }
    @PutMapping("/updateStudent")
    Student updateStudent(@RequestBody  Student s){
        studentService.updateStudent(s);
        return s;
    }
    @DeleteMapping("/deleteStudent/{id}")
    ResponseEntity<HttpStatus> deleteStudent(@PathVariable long id){
        try{
            studentService.deleteStudent(id);
            return new  ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
