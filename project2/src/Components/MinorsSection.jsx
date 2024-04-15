import React, { useState } from 'react'
import getData from '../utils/getData'
import CourseButton from './CourseButton';

// Components
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const MinorSection = ({ id }) => {
    const [loaded, setLoaded] = useState(false);
    const [minorsObj, setMinorsObj] = useState();

    React.useEffect(() => {
        getData('minors/')
            .then((json) => {
                setMinorsObj(json);
                setLoaded(true);
            });

    }, []);

    return loaded ? (
        <div id={id}>
            <h1>Minors</h1>
            {
                minorsObj.UgMinors.map((minor) => [
                    <Accordion key={minor.name}>
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h1>{minor.title} </h1>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>{minor.description}</p>
                            <div>
                                <Divider />
                                <nav aria-label="">
                                    <List>
                                        {minor.courses.map((course) => [
                                            <CourseButton key={course} course={course}/>
                                        ])}
                                    </List>
                                </nav>
                            </div>
                            <p><strong>Note: </strong>{minor.note}</p>
                        </AccordionDetails>
                    </Accordion>
                ])
            }
        </div>
    ) : (
        <Skeleton animation='wave' variant="rectangular" height={100} />
    );
};

export default MinorSection;