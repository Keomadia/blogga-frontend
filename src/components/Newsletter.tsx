import React from 'react';
import { Box, Typography, InputLabel, Stack, TextField, Button } from '@mui/material';
import LogoIcon from '../components/BloggaIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const API_URL = 'https://blogga-flask-app.onrender.com';

export function NewsletterPopup() {
    const [open, setOpen] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    // const API_URL = process.env.REACT_APP_API_URL;
    ;
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubscribe = async (email: string) => {
        setError("");
        setSuccessMessage("");
        
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setError("Please enter a valid email address.");
            return;
        }
    
        try {
            const response = await axios.post(`${API_URL}/api/blog/subscribe`, { email });
    
            if (response.status === 201) {
                setSuccessMessage("Successfully Subscribed");
            } else if (response.status === 200) {
                setSuccessMessage("Already a Subscriber Thanks");
            }
    
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };
    

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email as string;
                            await handleSubscribe(email);
                        },
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    {
                        successMessage && (
                            <Typography color="success" variant="body2" sx={{ mb: 1 }}>
                                {successMessage}
                            </Typography>
                        )
                    }
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const Newsletter: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    const handleSubscribeAgain = async () => {
        setError("");
        setSuccessMessage("");
    
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setError("Please enter a valid email address.");
            return;
        }
    
        try {
            const response = await axios.post(`${API_URL}/api/blog/subscribe`, { email });
    
            if (response.status === 201) {
                setSuccessMessage("Successfully Subscribed");
            } else if (response.status === 200) {
                setSuccessMessage("Already a Subscriber Thanks");
            }
        } catch (err: any) {
            console.error();
            setError(err.response?.data?.error || `An error occurred`);
        }
    };
    
    return (
        <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            
            <LogoIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                Join the newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for weekly updates. No spams ever!
            </Typography>
            <InputLabel htmlFor="email-newsletter">Email</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
                <TextField 
                    id="email-newsletter"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    fullWidth
                    type="email"
                    placeholder="Your email address"
                    sx={{ width: '250px' }}
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                />
                <Button variant="contained" color="primary" size="small" sx={{ flexShrink: 0 }} onClick={handleSubscribeAgain} >Subscribe</Button>
            </Stack>
            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}

            {successMessage && <Typography color="success" variant="body2" sx={{ mt: 1 }}>{successMessage}.</Typography>}
        </Box>
    );
};

export default Newsletter;
