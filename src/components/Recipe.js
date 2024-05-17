import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './Recipe.scss'
import Datatable from './Datatable'
const Recipe = () => {
  return (
    <div className='list'>
        <Sidebar/>
        <div className='listContainer'>
            <Navbar/>
            <Datatable/>
        </div>
    </div>
  )
}

export default Recipe