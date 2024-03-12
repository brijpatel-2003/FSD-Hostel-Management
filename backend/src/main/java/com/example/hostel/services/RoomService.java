package com.example.hostel.services;

import com.example.hostel.dao.RoomDao;
import com.example.hostel.entity.Room;
import com.example.hostel.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    RoomDao roomDao;
    public List<Room> getRooms(){
       return  roomDao.findAll();
    }
   public Room getRoom(long id){
        return roomDao.findById(id).get();
    }
    public void addRoom(Room r){
        roomDao.save(r);
    }
    public void updateRoom(Room r){
        roomDao.save(r);
    }
    public void deleteRoom(long id){
        roomDao.delete(roomDao.getOne(id));
    }
    public Room getStudentRoom(Long id){
        List<Room> list = roomDao.findAll();
        for(Room r:list){
            for(Student s: r.getStudentList()){
                if(s.getReg_no() == id){
                    return r;
                }
            }
        }
        return null;
    }
    public List<Room> getvalidRooms() {
       List<Room >list =  roomDao.findAll();
        List<Room >emptyList = new ArrayList<>();
     for(Room r:list){
         if(r.getStudent_capacity()>r.getStudentList().size()){
             emptyList.add(r);
         }
     }
     return emptyList;
    }

    public Boolean isPresent(Long id) {
        List<Room> list = roomDao.findAll();
        for(Room s: list){
            if(s.getRoom_no() ==id){
                return  true;
            }
        }
        return  false;
    }
}
