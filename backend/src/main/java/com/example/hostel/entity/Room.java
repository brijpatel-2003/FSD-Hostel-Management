package com.example.hostel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    Long  room_no;
    String room_type;
    int student_capacity;
    int student_available;
    int room_fees;
//    @JsonIgnore
    @JsonManagedReference(value = "room-student")
    @OneToMany(mappedBy = "room",fetch = FetchType.EAGER)
    List<Student> studentList = new ArrayList<>();
  
}
