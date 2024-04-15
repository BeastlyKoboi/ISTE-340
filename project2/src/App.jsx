// Import the important stuff
import React, { useState } from 'react'
import getData from './utils/getData';

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
import MinorSection from './Components/MinorsSection';
import EmploymentSection from './Components/EmploymentSection';

// Import the css
import './App.css'

const App = () => {
  return (
    <>
      <div className='App'>

        <h1>Golisano College of Computing and Information Sciences</h1>
        <AboutSection id='about-section' />
        <br />
        <DegreesSection id='degrees-section' />
        <br />
        <MinorSection id='minors-section' />
        <br />
        <EmploymentSection id='employment-section' />
        <br />
        <PeopleTabs />
        <hr />
        <PeopleModal />
      </div>
    </>
  )
}

export default App
