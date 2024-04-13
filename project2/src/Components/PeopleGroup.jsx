import React from 'react'
import PeopleModal from './PeopleModal';

const PeopleGroup = ({ title, whichGroup }) => {
    return (
        <>
            <h2>{title}</h2>
            <div className='peopleList'>
                {
                    whichGroup.map((p) =>
                        <div className='peopleListItem' key={p.username}>
                            <img src={p.imagePath} alt="Person profile photo" />
                            {/* <h3>{p.name}</h3> */}

                            <PeopleModal {...p}/>
                        </div>
                    )
                };
            </div>
        </>
    );
}


export default PeopleGroup;