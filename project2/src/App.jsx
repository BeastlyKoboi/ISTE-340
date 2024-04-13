// Import the important stuff
import React, { useState } from 'react'
import getData from './utils/getData';

// Import the css
import './App.css'

// Import the components
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import AboutSection from './Components/AboutSection';
import PeopleTabs from './Components/PeopleTabs';
import PeopleModal from './Components/PeopleModal';
import DegreesSection from './Components/DegreesSection';


const App = () => {
  return (
    <>
      {/* <AppBar position='sticky'>

        <Toolbar sx={{
          backgroundColor: '#F76902'
        }} >

          <h1>
            <a href="#about-section">About</a>
          </h1>
          <h1>
            <a href="#degrees-section">Degrees</a>
          </h1>
          <Typography variant='h3' component='div'>
            <a href="#about-section">About</a>
          </Typography>
          <Typography variant='h3' component='div'>
          <a href="#degrees-section">Degrees</a>
          </Typography>

        </Toolbar>

      </AppBar> */}

      <div className='App'>
        <AboutSection id='about-section' />
        <hr />
        <DegreesSection id='degrees-section' />
        <hr />
        <PeopleTabs />
        <hr />
        <PeopleModal />
      </div>
    </>
  )
}

export default App
