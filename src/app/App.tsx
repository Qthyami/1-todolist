import React, {useEffect} from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import {Routes, Route, Navigate} from "react-router-dom"

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Menu} from "@mui/icons-material";
import {logOutTC, meTC} from "../features/Login/auth-reducer";


function App() {
const status = useAppSelector(state => state.app.status)
    const isLoggedIn= useAppSelector((state)=>state.auth.isLoggedIn)
    const isInitialised = useAppSelector<boolean>((state) => state.app.isInitialised)
    const dispatch=useAppDispatch()
    useEffect(()=>{


        dispatch(meTC())
    },[])
const logOut=()=>{
    dispatch(logOutTC())
}
    if(!isInitialised){

        return <div style={{position: "fixed", top: "30%", textAlign:"center", width: '100%'}}><CircularProgress /></div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { !isLoggedIn?<Button color="inherit">Login</Button> : <Button onClick={logOut} color="inherit">LogOut</Button>}
                </Toolbar>
                {status==="loading" && <LinearProgress color={"primary"}/>}
            </AppBar>
            <Container fixed>
             <Routes>
                 <Route path = "/" element = { <TodolistsList/>}/>
                 <Route path = "/login" element = { <Login/>}/>
                 <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                 <Route path='*' element={<Navigate to={"/404"}/>} />
             </Routes>

            </Container>
        </div>
    )
}

export default App



