import "./New.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {toast} from 'react-hot-toast';
const New1 = () => {
  const [ingredientId,setIngredientId]=useState(0);
  const [ingredientName,setIngredientName]=useState('');
  const [ingredientImage,setIngredientImage]=useState('');
  const [price,setPrice]=useState(0);
  const [qty,setQty]=useState(1);
  const [unit,setUnit]=useState();
  function add(){
    var proceed=true;
    if(ingredientId==0 || ingredientName=="" || ingredientImage=="" || price==0 || unit=="")
    {
        proceed=false;
    }
    if(proceed==true)
    {
    fetch(`http://localhost:5112/api/Ingredient/Post1?ingredientId=${ingredientId}&ingredientName=${ingredientName}&ingredientImage=${ingredientImage}&price=${price}&qty=${qty}&unit=${unit}`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ingredientId:ingredientId,
            ingredientName:ingredientName,
            ingredientImage:ingredientImage,
            price:price,
            qty:qty,
            unit:unit
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        toast.success(result);
    },(error)=>{
        toast.error('failed');
    })}
  }
  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Ingredient Id</label>
                <input type="text" value={ingredientId} onChange={(e)=>setIngredientId(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Ingredient Name</label>
                <input type="text" value={ingredientName} onChange={(e)=>setIngredientName(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Ingredient Image Link</label>
                <input type="text" value={ingredientImage} onChange={(e)=>setIngredientImage(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Price</label>
                <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Unit</label>
                <input type="text" value={unit} onChange={(e)=>setUnit(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <input type="text" value={qty} onChange={(e)=>setQty(e.target.value)}></input>
              </div>
            </form>
            <div className="flex justify-content-center">
                <button className="mt-10" onClick={add}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New1;