import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

export default function PunCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Author Name: {props.pun.userName}
        </Typography>

        <Typography variant='body2' component='p'>
          {props.pun.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
