import React, { useState } from 'react'
import getData from '../utils/getData';

// Components
import Skeleton from '@mui/material/Skeleton';


const AboutSection = ({ id }) => {
    // State
    const [loaded, setLoaded] = useState(false);
    const [aboutObj, setAboutObj] = useState();

    React.useEffect(() => {
        // The page was just rendered, now get data!
        getData('about/')
            .then((json) => {
                setAboutObj(json);
                setLoaded(true);
            });

    }, []);

    if (!loaded)
        return (
            <>
                <Skeleton animation='wave' variant="rectangular" height={100} />
            </>
        );



    return (
        <div id={id} className='About'>
            <h2>{aboutObj.title}</h2>
            <h3>{aboutObj.description}</h3>
            <div className='aboutQuote'>
                <h4 className='quote'>{aboutObj.quote}</h4>
                <h4>--{aboutObj.quoteAuthor}</h4>
            </div>
        </div>
    )
}

export default AboutSection;