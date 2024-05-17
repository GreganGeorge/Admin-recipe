import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './Recipe.scss'
import Ingredients from './Ingredients'
const Recipe = () => {
  return (
    <div className='list'>
        <Sidebar/>
        <div className='listContainer'>
            <Navbar/>
            <Ingredients/>
        </div>
    </div>
  )
}

export default Recipe