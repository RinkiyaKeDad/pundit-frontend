import React, { useState, useEffect } from 'react';
import PunCard from '../layout/PunCard';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

export default function Home() {
  const [puns, setPuns] = useState([]);
  useEffect(() => {
    const fetchAllPuns = async () => {
      try {
        const response = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/puns/all/`
        );
        console.log(response.data);
        setPuns(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPuns();
  }, []);
  return (
    <Grid container spacing={4}>
      {puns &&
        puns.map((pun, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <PunCard pun={pun} />
          </Grid>
        ))}
    </Grid>
  );
}
