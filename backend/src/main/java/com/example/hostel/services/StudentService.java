package com.example.hostel.services;

import com.example.hostel.dao.RoomDao;
import com.example.hostel.dao.StudentDao;
import com.example.hostel.entity.Room;
import com.example.hostel.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    StudentDao studentDao;
    @Autowired
    RoomDao roomDao;
    List<Student> studentList ;
    public List<Student> getStudents() {
        return studentDao.findAll();
    }
    public Student getStudent(long reg_no){
    return studentDao.findById(reg_no).get();
    }
    public void addStudent(Student s, Long id){


        Optional<Room> r = roomDao.findById(id);

        if(r.isPresent())
        {
            Room p = r.get();
            s.setRoom(p);
            studentDao.save(s);
            List <Student> list =  p.getStudentList();
            list.add(s);
            p.setStudentList(list);
            roomDao.save(p);

        }


    }
    public void addStudent(Student s){
        studentDao.save(s);

    }
    public void updateStudent(Student s){
    studentDao.save(s);
    }

    public void deleteStudent(long reg_no){
        studentDao.delete(studentDao.findById(reg_no).get());
    }

    public Boolean isPresent(Long id) {
       List<Student> list = studentDao.findAll();
        for(Student s: list){
            if(s.getReg_no() ==id){
                return  true;
            }
        }
        return  false;
    }
}
