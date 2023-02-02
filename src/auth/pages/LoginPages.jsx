import { Link as RouterLink } from 'react-router-dom'

import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { starLogin, startGoogle } from '../../store/slice/auth/thunks'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: '',
}

export const LoginPages = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  // const isCheckingAuthenticating = useMemo(() => status === 'checking', [status]);

  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

const onSubmit = (e) => {
  e.preventDefault();

  // console.log(email, password);
  dispatch( starLogin({ email, password }) )
}

const onGoogle = () => {
  // console.log('onGoogle');
  dispatch(startGoogle());
}
 
  return (
    <AuthLayout title='login'> 
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}} >
              <TextField label='Correo' type='email' placeholder='email@mail.com' fullWidth name='email' value={email} onChange={onInputChange} />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}} >
              <TextField label='Contraseña' type='password' placeholder='Contraseña' fullWidth name='password' value={password} onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2}} >

              <Grid item xs={12} display={!!errorMessage ? '' : 'none'} sx={{mt:3}} >
                <Alert severity='error'>{ errorMessage }</Alert>            
              </Grid>

              <Grid item xs={12} sm={6} >
                  <Button type='submit' variant='contained' sx={{mt: 2 }} fullWidth 
                  disabled={isAuthenticating} > Login </Button>
              </Grid>

              <Grid item xs={12} sm={6} >
                
                  <Button variant='contained' sx={{mt: 2 }} fullWidth onClick={onGoogle} disabled={isAuthenticating} > 
                    <Google/>
                    <Typography sx={{ml:1}} >Google</Typography>                   
                  </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end' sx={{}} >
              <Link component={RouterLink} color='inherit' to='/auth/register' >
                Crea Una Cuenta
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayout>
  )
}
