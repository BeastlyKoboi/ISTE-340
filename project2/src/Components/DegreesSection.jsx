import React, { useState } from 'react'
import getData from '../utils/getData'

import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DegreesSection = ({id}) => {

    const [loaded, setLoaded] = useState(false);
    const [degreesObj, setDegreesObj] = useState();

    React.useEffect(() => {
        getData('degrees/')
            .then((json) => {
                console.log('people got', json);
                setDegreesObj(json);
                setLoaded(true);
                console.log(json);
            });

    }, []);

    const showDegrees = (degree) => {
        if (degree.title) {
            return <Accordion key={degree.degreeName}>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h1>{degree.title}</h1>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{degree.description}</p>
                </AccordionDetails>
            </Accordion>
        }
        else {
            return <Accordion key={degree.degreeName}>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h1>{degree.degreeName}</h1>
                </AccordionSummary>
                <AccordionDetails>
                    {degree.availableCertificates.map((certificate) => {
                        return <h2>{certificate}</h2>
                    })}
                </AccordionDetails>
            </Accordion>
        }
    }

    return loaded ? (
        <>
        <div id={id}>
            {degreesObj.graduate.map(showDegrees)}
            {degreesObj.undergraduate.map(showDegrees)}
        </div>
        </>
    ) : (
        <Skeleton animation='wave' variant="rectangular" height={100} />
    );
};

export default DegreesSection;