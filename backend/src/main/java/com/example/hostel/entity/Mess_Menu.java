package com.example.hostel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Mess_Menu {
    @Id
    Long menu_id;
    String day;
    String breakfast;
    String lunch;
    String dinner;
}
