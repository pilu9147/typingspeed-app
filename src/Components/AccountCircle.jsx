import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs, Box } from '@mui/material';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import { auth } from '../firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

const AccountCircle = ()=>{

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const {theme} = useTheme();

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const handleModalOpen = () =>{

        if(user){
           //navigate to the user page
           navigate('/user');
        }
        else{
            setOpen(true);
        }
        
    }

    const handleClose = ()=>{
         setOpen(false);
    }    

    const handleValueChange = (e,v)=>{
        setValue(v);

    }

    const logout = ()=>{
        auth.signOut().then((res)=>{
            toast.success('Logged out', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }).catch((err)=>{
            toast.error('not able to logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

   const googleProvider = new GoogleAuthProvider();

   const handleGoogleSignIn = ()=>{
        signInWithPopup(auth, googleProvider).then((res)=>{
            toast.success('Google login successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'some error occured', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        });

       
   }

 return(
        <div>
            <AccountCircleIcon onClick={handleModalOpen} style={{cursor:'pointer'}}/>
            {user && <LogoutIcon onClick={logout} style={{cursor:'pointer'}}/>}

            <Modal 
               open={open} 
               onClose={handleClose}
               style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
               }}
            >

                <div style={{
                    width: '400px', 
                    textAlign: 'center',
                    backgroundColor:theme.background,
                    borderRadius: '10px',
                    border: `2px solid ${theme.textColor}`
                    }}>

                    <AppBar position='static' style={{background: 'transparent'}}>
                        <Tabs 
                            value={value}
                            onChange={handleValueChange}
                            variant='fullWidth'>
                            <Tab label='login' style={{color: theme.textColor}}></Tab>
                            <Tab label='signup' style={{color: theme.textColor}}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleClose={handleClose}/>}
                    {value === 1 && <SignupForm handleClose={handleClose}/>}

                    <Box>
                        <span>OR</span>
                        <GoogleButton
                             style={{
                                width: '88%', 
                                marginTop: '20px', 
                                marginLeft: '22px',
                                marginRight: '10px',
                                marginBottom: '10px',
                            }}
                             onClick={handleGoogleSignIn}
                        />
                    </Box>
                </div>

            </Modal>
        </div>
    )
}

export default AccountCircle;