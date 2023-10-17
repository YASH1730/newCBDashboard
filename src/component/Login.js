import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../assets/css/main.css"
import logo from "../assets/images/logo.png"
import { setAlert, setAuth } from '../store/action/action';

const Login = () => {

    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()

    const [value,setValue]= useState({
        email : "",
        password  : ""
    })
    function handleValue(e){
        setValue(old=>({...old,[e.target.name] : e.target.value}))
    }  
    function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        if(value.password === "cb@2023" && value.email === "classbazar19@gmail.com")
        {
            dispatch(setAuth({isAuth : true}))
            window.location.pathname = "/"
        }
        else
        dispatch(setAlert({open : true, variant : "error",message : "Incorrect credentials !!!" }))

    }

    return (
        <Box className = "login_container">
        <Grid component={"form"} method='post'  onSubmit={handleSubmit} container p={3} style={{display : 'flex',gap : "1rem",textAlign : "center", justifyContent : "center"}}>
            <Grid item xs={12}>
                <img src={logo} alt='logo' />
            </Grid>
            {/* <Grid item xs={12}>
                <Typography variant='h6'>Dashboard Login</Typography>
            </Grid> */}
            <Grid item xs={12}>
                <TextField required onChange={handleValue} value={value.email} fullWidth type='email' label = "Email" name='email' ></TextField>    
            </Grid>    
            <Grid item xs={12}>
                <TextField required onChange={handleValue}  value={value.password} fullWidth type='password' label = "Password" name='password'></TextField>    
            </Grid>    
            <Grid item xs={12}>
                <Button type='submit'  variant='contained'>Log In</Button>    
            </Grid>    
        </Grid>   
        </Box>
    );
}

export default Login;
