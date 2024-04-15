import React, { useState } from 'react'
import getData from '../utils/getData'

// Components
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DegreesSection = ({ id }) => {
    const [loaded, setLoaded] = useState(false);
    const [degreesObj, setDegreesObj] = useState();

    React.useEffect(() => {
        getData('degrees/')
            .then((json) => {
                setDegreesObj(json);
                setLoaded(true);
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
                    <p>Concentrations</p>
                    {degree.concentrations.map((concentration) => [
                        <p key={concentration}>{concentration}</p>
                    ])}
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
                    {degree.availableCertificates.map((certificate) => [
                        <h2 key={certificate}>{certificate}</h2>
                    ])}
                </AccordionDetails>
            </Accordion>
        }
    }

    return loaded ? (
        <div id={id}>
            <h1>Graduate Degrees</h1>
            {degreesObj.graduate.map(showDegrees)}
            <h1>Undergraduate Degrees</h1>
            {degreesObj.undergraduate.map(showDegrees)}
        </div>
    ) : (
        <Skeleton animation='wave' variant="rectangular" height={100} />
    );
};

export default DegreesSection;