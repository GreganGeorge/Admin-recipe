import React from 'react'
import Sidebar from './Sidebar'
import './Home.scss';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'><Navbar/></div>
    </div>
  )
}

export default Home