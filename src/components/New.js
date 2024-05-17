import "./New.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {toast} from 'react-hot-toast';
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [recipeId,setRecipeId]=useState(0);
  const [recipeName,setRecipeName]=useState('');
  const [recipeImage,setRecipeImage]=useState('');
  const [vegNonVeg,setVegNonVeg]=useState('');
  const [nutrition,setNutrition]=useState('');
  const [instructions,setInstructions]=useState('');
  const [video,setVideo]=useState('');
  function add(){
    var proceed=true;
    if(recipeId==0 || recipeName=="" || recipeImage=="" || vegNonVeg==""|| nutrition==""|| instructions==""|| video=="")
    {
        proceed=false;
    }
    if(proceed==true)
    {
    fetch(`http://localhost:5112/api/user/Post1?recipeId=${recipeId}&recipeName=${recipeName}&recipeImage=${recipeImage}&vegNonVeg=${vegNonVeg}&nutrition=${nutrition}&instructions=${instructions}&video=${video}`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            recipeId:recipeId,
            recipeName:recipeName,
            recipeImage:recipeImage,
            vegNonVeg:vegNonVeg,
            nutrition:nutrition,
            instructions:instructions,
            video:video
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
                <label>Recipe Id</label>
                <input type="text" value={recipeId} onChange={(e)=>setRecipeId(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Recipe Name</label>
                <input type="text" value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Recipe Image Link</label>
                <input type="text" value={recipeImage} onChange={(e)=>setRecipeImage(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Veg/NonVeg</label>
                <input type="text" value={vegNonVeg} onChange={(e)=>setVegNonVeg(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Nutrition</label>
                <input type="text" value={nutrition} onChange={(e)=>setNutrition(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Instruction</label>
                <input type="text" value={instructions} onChange={(e)=>setInstructions(e.target.value)}></input>
              </div>
              <div className="formInput">
                <label>Video</label>
                <input type="text" value={video} onChange={(e)=>setVideo(e.target.value)}></input>
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

export default New;