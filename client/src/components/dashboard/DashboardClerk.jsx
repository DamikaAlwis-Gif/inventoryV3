import * as React from 'react';
import { useState, useEffect } from 'react';

import { NAVBAR_HEIGHT } from '../../constants';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DashboardInfoCard from './DashboardInfoCard';

import axios from 'axios';

import {base_url} from '../../config';

import "@fontsource/cinzel-decorative/400.css";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';

let themeDashboardHeading = createTheme({
  typography: {
    fontFamily: [
      "Cinzel Decorative",
    ].join(','),
},});
themeDashboardHeading = responsiveFontSizes(themeDashboardHeading);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Dashboard() {

  const [availableNow, setAvailableNow] = useState(0);
  const [checkedOut, setCheckedOut] = useState(0);
  const [underMaintenance, setUnderMaintenance] = useState(0);
  const [outofOrder, setOutofOrder] = useState(0);

  useEffect(() => {

    // const getVerification = async () => {
    //   const response = await axios.get("${base_url}/dashboard/verify");
    //   console.log(response);
    // }

    // getVerification();

    const getStatistics = async () => {
      try {
        const statistics = await axios.get(`${base_url}/dashboard`)

        console.log(statistics.data);
        statistics.data.available && setAvailableNow(statistics.data.available);
        statistics.data.checkedOut && setCheckedOut(statistics.data.checkedOut);
        statistics.data.maintenance && setUnderMaintenance(statistics.data.maintenance);
        statistics.data.outofOrder && setOutofOrder(statistics.data.outofOrder);

      } catch (error) {
        console.log(error);
      }
    }

    getStatistics();

  }, [])


  return (
    <Container
      maxWidth="lg"
      disableGutters={true}
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflowY: 'auto',
        width: '1050px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        '@media (max-width:1325px)':{width: '80%',},
        '@media (max-width:1200px)':{width: '85%',},
        '@media (max-width:1100px)':{width: '90%',},
        '@media (max-width:1010px)':{width: '94%',},
        '@media (max-width:975px)': {width: '97%',},
        '@media (max-width:899px)': {width: '70%',},
        '@media (max-width:850px)': {width: '75%',},
        '@media (max-width:775px)': {width: '80%',},
        '@media (max-width:725px)': {width: '85%',},
        '@media (max-width:650px)': {width: '90%',},
        '@media (max-width:550px)': {width: '95%',},
        '@media (max-width:525px)': {width: '97%',},
        '@media (max-width:460px)': {width: '90%',},
        '@media (max-width:420px)': {width: '95%',},
      }}
    >

    <div>
      <ThemeProvider theme={themeDashboardHeading}>
        <Typography variant="h4" align='center' mb={1} sx={{color: '#201d30'}}>
          Welcome to
        </Typography>
        <Typography variant="h3" align='center' mb={6} sx={{color: '#201d30'}}>
          Wisdom Education Laboratories
        </Typography>
      </ ThemeProvider>
    </div>

      {/*Shortcuts*/}
      {/* <Grid container rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 3}} columnSpacing={{ xs: 1, sm: 2, md: 1, lg: 3}} mb={2} sx={{ paddingTop: 3}}>

        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>View&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Resources</strong></Typography>
              </span>}
            customLink="/resources"
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>View&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Reservations</strong></Typography>
              </span>}
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>View a&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Check-outs</strong></Typography>
              </span>}
          />
        </Grid>
        <Grid item container xs={12} sm={6} md={3} justifyContent='center'>
          <DashboardShortcut 
            customColor="default"
            customLabel={
              <span>
                <Typography variant="body1" style={{ display: 'inline' }}>View&nbsp;</Typography>
                <Typography variant="h6" style={{ display: 'inline' }}><strong>Maintenance</strong></Typography>
              </span>}
            customLink="/resources"
          />
        </Grid>
      </Grid> */}

      <ThemeProvider theme={darkTheme}>
      {/*Info Cards*/}
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 2, lg: 3}} columnSpacing={{ xs: 1, sm: 2, md: 1, lg: 3}} mb={6}>
        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>{availableNow}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '30px' }}>
                available now
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>{checkedOut}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '30px' }}>
                checked out
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="primary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>{underMaintenance}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '30px' }}>
                under maintenance
              </Typography>
            </span>}
          />
        </Grid>

        <Grid item container xs={6} sm={6} md={3} justifyContent='center'>
          <DashboardInfoCard customColor="secondary" customLabel={
            <span>
              <Typography variant="h2" style={{ display: 'inline' }}>
                <strong>{outofOrder}</strong>
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" style={{ display: 'inline' }}>
                items
              </Typography>

              <Typography variant="body1" sx={{ marginTop: '30px' }}>
                out of order
              </Typography>
            </span>}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
      {/* <DenseTable /> */}
    </Container>
  );
}
