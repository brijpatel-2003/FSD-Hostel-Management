package com.example.hostel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    @Id
    private Long reg_no;
    private String starting_date;
    private String first_name;
    private String last_name;
    private String email;
    private String gender;
    private long contact_no;
    private String address;
    private String city;
    private Long pincode;
//    @JsonIgnore
    @JsonBackReference(value = "room-student")
    @ManyToOne(fetch = FetchType.EAGER)
    Room room;
//    @JsonIgnore
    @JsonManagedReference(value = "payment-student")
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "student",cascade = CascadeType.ALL)
    List<Payment> payments;
}