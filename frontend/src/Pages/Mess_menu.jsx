import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import LeftSlider from '../component/LeftSlider'

let flag = true;
let mess_menu = {
    menu_id:1,
    day:"",
    breakfast:"",
    lunch:"",
    dinner:"",
}


let a = [];
let b = [];
let c = [];
function setBreakfast(data){
    a=[];
    let j=0;
    let q = "";
  for(let i=0;i<data.breakfast.length;i++){
    let p = data.breakfast[i];
    
    if(p == ','){
        a.push(q);
        q=[];
        j++;
    }
    else{
     q = q + p;
      console.log(q);
    }
  }
  a.push(q);
}
function setLunch(data){
    b=[];
    let j=0;
    let q = "";
  for(let i=0;i<data.lunch.length;i++){
    let p = data.lunch[i];
    
    if(p == ','){
        b.push(q);
        q=[];
        j++;
    }
    else{
     q = q + p;
      console.log(q);
    }
  }
  b.push(q);
}
function setDinner(data){
    c=[];
    let j=0;
    let q = "";
  for(let i=0;i<data.dinner.length;i++){
    let p = data.dinner[i];
    
    if(p == ','){
        c.push(q);
        q=[];
        j++;
    }
    else{
     q = q + p;
      console.log(q);
    }
  }
  c.push(q)
}
const Mess_menu = () => {
    const [menu,setMenu] = useState(mess_menu);
    const [dat,setDay]= useState("monday");
    function handleChange(e){
      flag = false;
        console.log(e.target.value);
        fetch("http://localhost:8081/menu/getmenu/day/"+e.target.value).then(response=>response.json()).then((data)=>{
               setBreakfast(data);
                setLunch(data);
                setDinner(data);
                setMenu(data)
              
            return data;}).catch(err=>err);
    }
    useEffect(()=>{
      if(flag == true){
        fetch("http://localhost:8081/menu/getmenu/id/1").then(response=>response.json()).then((data)=>{
          setBreakfast(data);
           setLunch(data);
           setDinner(data);
           setMenu(data)
       return data;}).catch(err=>err);
      }
       

    },[])
  return (
    <div> <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

   <Header/>

    <LeftSlider/>

    <div class="page-wrapper"  style={{display:"block"}}>

        <div class="page-breadcrumb">
            <div class="row">
                <div class="col-7 align-self-center d-flex justify-content-around">
                <h4  class="page-title text-truncate text-dark font-weight-medium mb-1 container-fluid col-md-6">Mess Menu</h4>

<div class="container mt-5 col-md-6 ">
<div class="row justify-content-end">
<div class="col-md-6">
<div class="form-group text-right"> 
<label for="daySelect">Select Day:</label>
<select class="form-control" id="daySelect" onChange={handleChange}>

<option value="Monday">Monday</option>
<option value="Tuesday">Tuesday</option>
<option value="Wednesday">Wednesday</option>
<option value="Thursday">Thursday</option>
<option value="Friday">Friday</option>
<option value="Saturday">Saturday</option>
<option value="Sunday">Sunday</option>
</select>
</div>
</div>
</div>
</div>
</div>  
            </div>
        </div>
    {console.log("menu",menu)}
    {
          
        <div class="container-fluid">
                
         <h4 class="card-title mt-5">Breakfast</h4>
         <div class="row">
            <ol> {a.map(x=>{return <ul>{x}</ul>})}</ol>
      
         </div>

         <h4 class="card-title mt-5">Lunch</h4>
         <div class="row">
         <ol> {b.map(x=>{return <ul>{x}</ul>})}</ol>
         </div>

         <h4 class="card-title mt-5">Dinner</h4>
         <div class="row">
         <ol> {c.map(x=>{return <ul>{x}</ul>})}</ol>
         </div>
          </div>
}

       
    </div>
</div></div>
  )
}

export default Mess_menu