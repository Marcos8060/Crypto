import React from 'react'
import { AppBar, MenuItem, Select } from '@material-ui/core'
import { Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(() => ({
  title:{
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))

const Header = () => {
  const { currency, setCurrency} = CryptoState();
  console.log(currency)
  const classes = useStyles();
  const history = useNavigate()

  const darkTheme = createTheme({
    palette:{
      primary:{
        main: '#fff'
      },
      type: 'dark'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
       <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography 
          onClick={() => history('/')}
          className={classes.title}
          variant='h6'
          >
            Crypto Hunter </Typography>
          <Select
          variant='outlined'
          style={{
            width: 100,
            height: 40,
            marginRight: 14
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EURO'}>EURO</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header