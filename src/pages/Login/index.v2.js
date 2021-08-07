import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import LoadingImg from '../../assets/loading.png'
import api from '../../services/api'
import Bandeira from '../../assets/Bandeira/Bandeira.jpg'
import { Link, Typography, makeStyles, Grid, Avatar, TextField, Button, Box, Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { toast } from 'react-toastify';



export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Imporcenter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/porsche.jpg)',
    // backgroundImage: `url(${Bandeira})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: '90%'
  }
}));

export default function Login() {
  const classes = useStyles()
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('')

  useEffect(() => {
    //Check login
    //Key -> userId
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)

    const response = await api.post('/login', {
      code
    }).catch(err=>{
      toast.error('Código de acesso inválido, verifique-o e tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    })

    
    if(response){
      const user = response.data;
      
      toast.success('Login efetuado com sucesso!.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      //Logado, manda o usuário para o local correto
      if(user.admin){
        sessionStorage.setItem('user_id', user._id);
        await sessionStorage.setItem('user_key', user.code);
        history.push('/admin');
      }else{
        sessionStorage.setItem('user_id', user._id);
        await sessionStorage.setItem('user_key', user.code);
        history.push('/dashboard');
      }
    }
    return;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img className={classes.logo} src={LogoImg} alt="ImportCenter" />
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography> */}
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={code}
                onChange={e=> setCode(e.target.value)}
                name="codigo"
                label="Código de acesso"
                type="text"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
