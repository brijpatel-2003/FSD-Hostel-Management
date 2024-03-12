package com.example.hostel.controller;

import com.example.hostel.entity.Mess_Menu;
import com.example.hostel.services.Mess_MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class Mess_MenuController
{
    @Autowired
    Mess_MenuService messMenuService;
    List<Mess_Menu> l;
    @RequestMapping("/getmenus")
    List<Mess_Menu> getMenus(){
        return messMenuService.getMenus();
    }

    @RequestMapping("/getmenu/id/{id}")
    Mess_Menu getMenu(@PathVariable long id ){
        System.out.println(id);
        return messMenuService.getMenu(id);
    }
    @RequestMapping("/getmenu/day/{day}")
    Mess_Menu getMenu(@PathVariable String day ){

        return messMenuService.getMenuByDay(day);
    }
    @PostMapping("/addmenu")
    Mess_Menu addMenu(@RequestBody Mess_Menu m){
        messMenuService.addMenu(m);
        return m;
    }
    @PutMapping("/updatemenu")
    Mess_Menu updateMenu(@RequestBody Mess_Menu m){
        messMenuService.updateMenu(m);
        return m;
    }
    @DeleteMapping("/deletemenu/{id}")
    ResponseEntity<HttpStatus> deleteMenu(@PathVariable long id){
        try{
            messMenuService.deleteMenu(id);
            return new  ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


}
