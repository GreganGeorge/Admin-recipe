import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './Recipe.scss'
import SuggestionTable from './SuggestionTable'
const Suggestion = () => {
  return (
    <div className='list'>
        <Sidebar/>
        <div className='listContainer'>
            <Navbar/>
            <SuggestionTable/>
        </div>
    </div>
  )
}

export default Suggestion