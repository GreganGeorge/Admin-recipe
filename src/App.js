import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Recipe from './components/Recipe';
import New from './components/New';
import { Toaster } from 'react-hot-toast';
import New1 from './components/New1';
import Ingredient from './components/Ingredient';
import LoginForm from './components/LoginForm';
import Suggestion from './components/Suggestion';
function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route path='/' element={<LoginForm/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/recipe' element={<Recipe/>}/>
          <Route path='/recipe/new' element={<New/>}/>
          <Route path='/ingredient' element={<Ingredient/>}/>
          <Route path='/ingredient/new1' element={<New1/>}/>
          <Route path='/suggestion' element={<Suggestion/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
