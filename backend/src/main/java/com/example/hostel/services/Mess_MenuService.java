package com.example.hostel.services;

import com.example.hostel.dao.Mess_MenuDao;
import com.example.hostel.entity.Mess_Menu;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Mess_MenuService {
    @Autowired
    Mess_MenuDao messMenuDao;
   public  List<Mess_Menu> getMenus(){
        return messMenuDao.findAll();
    }
    public Mess_Menu getMenu(Long id){

        Mess_Menu messMenu = messMenuDao.findById(id).get();
            return messMenu;
            // Do something with the messMenu
    }
    public Mess_Menu getMenuByDay(String day){
       return messMenuDao.getMess_MenuByDay(day);
    }


    public void addMenu(Mess_Menu m){
        messMenuDao.save(m);
    }

   public  void updateMenu(Mess_Menu m){
        messMenuDao.save(m);
    }
    public void deleteMenu(long id){
        messMenuDao.delete(messMenuDao.getOne((id)));
    }


}
