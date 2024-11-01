import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Outlet, redirect, useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import userContext from './context/userContext/userContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import configServ from './services/config';



function App() {

    const location = useLocation()
    const { setUser } = useContext(userContext)
    const navigate = useNavigate()
    const token = Cookies.get('token')
    let decodedToken

    const getAdmin = async (id) => {

        const admin = await configServ.getAdminById(id)
        setUser(admin)
    }

    useEffect(() => {
        if (token) {
            decodedToken = jwtDecode(token)
            getAdmin(decodedToken.id)
        } else {
            // navigate('/login')
        }
    }, [location.pathname])

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                {location.pathname !== '/login' && (<Header />)}
                {location.pathname !== '/login' && (<Sidebar />)}

                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        // pt: { xs: 'calc(12px + var(--Header-height))' },
                        // // pb: { xs: 2, sm: 2, md: 0 },
                        // flex: 1,
                        // display: 'flex',
                        // flexDirection: 'column',
                        // minWidth: 0,
                        // height: '100dvh',
                        // gap: 1,
                        // background:"red",
                        // m: { xs: 2 }

                        pt: { xs: 'calc(12px + var(--Header-height))' },
                        pb: { xs: 2, sm: 2, md: 0 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        marginLeft: { xs: 0, md: 'var(--Sidebar-width)' },
                        padding: "10px",
                        zIndex: 1000,






                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default App;


export const AppLoader = () => {
    const token = Cookies.get('token')
    if (!token) {
        // return redirect('/login')
    }
    return null
}