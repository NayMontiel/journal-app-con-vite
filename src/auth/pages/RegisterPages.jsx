import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks';

import { starCreatingUser } from '../../store/slice/auth/thunks';


export const RegisterPages = () => {

  const dispatch = useDispatch();
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthenticating = useMemo(() => status === 'checking', [status]);

  const fomrData = {
    displayName: '',
    email: '',
    password: '',
  }


  const formValidations = {
    
    email: [(value) => value.includes('@'), 'El correo debe tener un @' ],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 caracteres' ],
    displayName: [(value) => value.length >= 1, 'El nombre es requerido' ],
  }

  const { formState ,displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(fomrData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!isFormValid) return;
    dispatch(starCreatingUser(formState));
  }

  return (
    <AuthLayout title='Register'>
    
      <form onSubmit={onSubmit}>
      <Grid container>

            <Grid item xs={12} sx={{mt: 2}} >
              <TextField label='Nombre Completo' type='text' placeholder='Escribe tu nombre' fullWidth name='displayName' value={displayName} onChange={onInputChange} 
              error={!!displayNameValid && formSubmitted} helperText={displayNameValid} />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}} >
              <TextField label='Correo' type='email' placeholder='email@mail.com' fullWidth
              name='email' value={email} onChange={onInputChange}  error={!!emailValid && formSubmitted} helperText={emailValid} />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}} >
              <TextField label='Contraseña' type='password' placeholder='Contraseña' fullWidth 
              name='password' value={password} onChange={onInputChange}  error={!!passwordValid && formSubmitted} helperText={passwordValid} />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2}} >

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}  >
              <Alert severity='error'>{ errorMessage }</Alert>            
            </Grid>

              <Grid item xs={12} >
                  <Button disabled={isCheckingAuthenticating} type='submit' variant='contained' sx={{mt: 2 }} fullWidth> Register </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end' sx={{}} >
              <Typography sx={{mr: 1}} >¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login' >
                Ingresar
              </Link>
            </Grid>

          </Grid>
      </form>
    </AuthLayout>
  )
}
