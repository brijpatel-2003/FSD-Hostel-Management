package com.example.hostel.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long pid;
    Long total_fees;
    Long fees_paid;
    Long pending_fees;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    Date date;
//    @JsonIgnore
    @JsonBackReference(value = "payment-student")
    @ManyToOne(fetch = FetchType.EAGER)
    Student student;

}
