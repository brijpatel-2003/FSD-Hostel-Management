package com.example.hostel.dao;

import com.example.hostel.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDao  extends JpaRepository<Student,Long> {

}
