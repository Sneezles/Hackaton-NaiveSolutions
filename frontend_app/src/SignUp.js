import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import GlobalContext from "./GlobalContext.js"
import CircularProgress from '@material-ui/core/CircularProgress';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const username = "test" + Date.now()
  const classes = useStyles();
  let history = useHistory();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState(username)
  const [password, setPassword] = useState(username)
  const [name, setName] = useState(username)
  const global = useContext(GlobalContext);


  const onCreateUser = async () => {
    setLoading(true)
    try {
      var res = await axios.post("http://188.166.122.66:8000/createUser", {
        email,
        password,
        name,
      })
      console.log(res)
      global.setContext({ user: res.data })
      history.push('/home')
    } catch (e) {
      console.log("Error")
      console.warn(e)
    }
    setLoading(false)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="lname"
              value={name}
              onChange={e => { setName(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onCreateUser}
        >{loading ? <CircularProgress color="secondary"></CircularProgress> : <Typography>Sign Up</Typography>}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <LinkRoute to="/singin">
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </LinkRoute>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}