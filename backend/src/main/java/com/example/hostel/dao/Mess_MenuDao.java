package com.example.hostel.dao;

import com.example.hostel.entity.Mess_Menu;
import com.example.hostel.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Mess_MenuDao extends JpaRepository<Mess_Menu,Long> {
Mess_Menu getMess_MenuByDay(String Day);
}
