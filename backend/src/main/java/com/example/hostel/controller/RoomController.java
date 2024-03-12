package com.example.hostel.controller;

import com.example.hostel.entity.Room;
import com.example.hostel.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/room")
public class RoomController {
    @Autowired
    RoomService roomService;
    @RequestMapping("/getRooms")
    List<Room> getRooms(){
       return roomService.getRooms();
    }
    @RequestMapping("/getRoom/{id}")
    Room getRoom(@PathVariable long id){
        return roomService.getRoom(id);
    }
    @RequestMapping("/validRooms")
   List<Room>getvalidRooms(){
        return roomService.getvalidRooms();
    }
    @RequestMapping("/getRoomCount")
    Long getRoomCount(){
        return (long) roomService.getRooms().size();
    }
    @RequestMapping("/getRoomNo/{id}")
    Boolean getStudentRegno(@PathVariable("id") Long id){
        return  roomService.isPresent(id);
    }
    @RequestMapping("/getFilledRoomCount")
    Long getFilledRoomCount(){
        return (long) (roomService.getRooms().size() - roomService.getvalidRooms().size());
    }

    @PostMapping("/addRoom")
     Room addRoom(@RequestBody Room r){
        roomService.addRoom(r);
        return r;
    }

    @PutMapping("/updateRoom")
    Room updateRoom(@RequestBody Room r){
        roomService.updateRoom(r);
        return r;
    }
    @DeleteMapping("/deleteRoom/{id}")
    ResponseEntity<HttpStatus> deleteStudent(@PathVariable long id){
        try{
           roomService.deleteRoom(id);
            return new  ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
