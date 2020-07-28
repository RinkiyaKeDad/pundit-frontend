import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textBoxWidth: {
    width: '100%',
  },
}));

export default function Login() {
  const [content, setContent] = useState();
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const submit = async e => {
    e.preventDefault();
    try {
      const createdPun = { content };
      const punRes = await Axios.post(
        'http://localhost:5000/puns/',
        createdPun,
        {
          headers: {
            'x-auth-token': userData.token,
          },
        }
      );

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create A Pun
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
            id='outlined-textarea'
            label='Create A Pun'
            placeholder='Put Your Amazing Pun Here!'
            multiline
            variant='outlined'
            onChange={e => setContent(e.target.value)}
            className={classes.textBoxWidth}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
