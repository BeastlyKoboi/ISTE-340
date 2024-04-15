import React, { useState } from 'react'
import getData from '../utils/getData'
import CoopTable from './CoopTable';
import EmploymentTable from './EmploymentTable';
import './EmploymentSection.css'

// Components
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const EmploymentSection = ({ id }) => {
    const [loaded, setLoaded] = useState(false);
    const [employObj, setEmployObj] = useState();

    React.useEffect(() => {
        getData('employment/')
            .then((json) => {
                setEmployObj(json);
                setLoaded(true);
            });
    }, []);

    return loaded ? (
        <div id={id}>
            <h1>{employObj.introduction.title}</h1>
            <div id='employment-intro'>
                {employObj.introduction.content.map((contentSec) => [
                    <div key={contentSec.title}>
                        <h2>{contentSec.title}</h2>
                        <p>{contentSec.description}</p>
                    </div>
                ])}
            </div>
            <h1>{employObj.degreeStatistics.title}</h1>
            <div id='degree-statistics'>
                {employObj.degreeStatistics.statistics.map((stat) => [
                    <div key={stat.value}>
                        <h2>{stat.value}</h2>
                        <h3>{stat.description}</h3>
                    </div>
                ])}
            </div>
            <div id='employers-and-careers-lists'>
                <div>
                    <h1>{employObj.employers.title}</h1>
                    <List>
                        {employObj.employers.employerNames.map((name) => [
                            <ListItem key={name} disablePadding>
                                <ListItemText primary={name} />
                            </ListItem>
                        ])}
                    </List>
                </div>
                <div>
                    <h1>{employObj.careers.title}</h1>
                    <List>
                        {employObj.careers.careerNames.map((name) => [
                            <ListItem key={name} disablePadding>
                                <ListItemText primary={name} />
                            </ListItem>
                        ])}
                    </List>
                </div>
            </div>

            <CoopTable id='coop-table-sec' table={employObj.coopTable} />
            <EmploymentTable id='employment-table-sec' table={employObj.employmentTable} />

        </div>
    ) : (
        <Skeleton animation='wave' variant="rectangular" height={100} />
    );
};

export default EmploymentSection;