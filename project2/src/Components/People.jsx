import React, { useState } from 'react';
import './People.css'
import getData from '../utils/getData';

/////////////////////////////////
/// Currently not in use
/////////////////////////////////

const People = () => {
    // state 
    const [loaded, setLoaded] = useState(false);
    const [pepObj, setPepObj] = useState();

    // go get data
    React.useEffect(() => {
        getData('people/')
            .then((json) => {
                console.log(json);
                setPepObj(json);
                setLoaded(true);
            });
    }, []);

    if (!loaded)
        return (<h1>...Loading People...</h1>);

    return (
        <>
            <h1>{pepObj.title}</h1>
            <h3>{pepObj.subtitle}</h3>
            <h3>Faculty</h3>
            <div className='peopleList'>
                {pepObj.faculty.map((p) => [
                    <div key={p.email} className='peopleListItem'>
                        <h3>{p.name}</h3>
                        <img src={p.imagePath} alt="person" />
                    </div>
                ])}
            </div>
            <h3>Staff</h3>
            <div className='peopleList'>
                {pepObj.staff.map((p) => [
                    <div key={p.email} className='peopleListItem'>
                        <h3>{p.name}</h3>
                        <img src={p.imagePath} alt="person" />
                    </div>
                ])}
            </div>
        </>
    )
};

export default People; 