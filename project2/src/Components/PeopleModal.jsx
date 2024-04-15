import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

export default function PeopleModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>{props.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="people-modal-name"
                aria-describedby="people-modal-tagline"
            >
                <Box sx={style}>
                    <img src={props.imagePath} alt="profile pic" />
                    <Typography id="people-modal-name" variant="h6" component="h2">
                        {props.name}
                    </Typography>
                    <Typography id="people-modal-tagline" sx={{ mt: 2 }}>
                        {props.tagline}
                    </Typography>
                    <Typography id="people-modal-title" sx={{ mt: 2 }}>
                        {props.title}
                    </Typography>

                    {
                        props.office &&
                        <Typography id="people-modal-office" sx={{ mt: 2 }}>
                            Office: {props.office}
                        </Typography>
                    }
                    {
                        props.website &&
                        <Typography id="people-modal-website" sx={{ mt: 2 }}>
                            Website: <a href={props.website} target='_blank'>{props.website} </a>
                        </Typography>
                    }
                    {
                        props.phone &&
                        <Typography id="people-modal-phone" sx={{ mt: 2 }}>
                            Phone: {props.phone}
                        </Typography>
                    }
                    {
                        props.email &&
                        <Typography id="people-modal-email" sx={{ mt: 2 }}>
                            Email: {props.email}
                        </Typography>
                    }
                    {
                        props.twitter &&
                        <Typography id="people-modal-twitter" sx={{ mt: 2 }}>
                            Twitter: {props.twitter}
                        </Typography>
                    }
                    {
                        props.facebook &&
                        <Typography id="people-modal-facebook" sx={{ mt: 2 }}>
                            Facebook: {props.facebook}
                        </Typography>
                    }
                </Box>
            </Modal>
        </div>
    );
}