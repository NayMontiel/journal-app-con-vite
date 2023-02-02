import { LoginOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { starLogout } from '../../store/slice/auth/thunks'

export const NavBar = ({drawerWidth}) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(starLogout());
    }

  return (
    <AppBar
        className='animate__animated animate__fadeInRight'
        position='fixed'
        sx={{ width: {sm: `calc(100% - ${drawerWidth}px)`}, ml: {sm: `${drawerWidth}px`}, borderRadius: 1 }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge= 'start'
                sx={{mr: 2, display: {sm: 'none'} }}
            >
                <MenuOutlined />                
            </IconButton>

            <Grid container direction='row' justifyContent='space-between'alignItems='center' >
                <Typography variant='h6' noWrap component='div' > Journal App</Typography>
                <IconButton
                    onClick={onLogout}
                    color='error'
                >
                    <LoginOutlined />           
                
                </IconButton>

            </Grid>



        </Toolbar>

    </AppBar>
  )
}
