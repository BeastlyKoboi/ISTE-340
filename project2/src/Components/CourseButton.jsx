import React, { useState } from 'react'
import getData from '../utils/getData'


// Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CourseButton = ({ course }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loaded, setLoaded] = useState(false);
    const [courseObj, setCourseObj] = useState();

    React.useEffect(() => {
        getData(`course/courseID=${course}`)
            .then((json) => {
                setCourseObj(json);
                setLoaded(true);
            });
    }, []);

    return loaded ? (
        <ListItem key={course} disablePadding>
            <ListItemButton component="button" onClick={handleOpen}>
                <ListItemText primary={course} />
            </ListItemButton >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="people-modal-name"
                aria-describedby="people-modal-tagline"
            >
                <Box sx={style}>
                    <Typography id="course-modal-courseid" variant="h6" component="h2">
                        {courseObj.courseID}
                    </Typography>
                    <Typography id="course-modal-title" sx={{ mt: 2 }}>
                        {courseObj.title}
                    </Typography>
                    <Typography id="course-modal-description" sx={{ mt: 2 }}>
                        {courseObj.description}
                    </Typography>
                </Box>
            </Modal>
        </ListItem >
    ) : (
        <ListItem key={course} disablePadding>
            <ListItemButton component="button">
                <ListItemText primary={course} />
            </ListItemButton >
        </ListItem >
    );
};

export default CourseButton;