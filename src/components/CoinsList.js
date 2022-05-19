import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import Container from '@material-ui/core/Container';
import { createTheme, LinearProgress, TableContainer, TextField, ThemeProvider, Typography } from '@material-ui/core'

const CoinsList = () => {
    const { currency } = CryptoState();
    const [coins,setCoins] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState()

    useEffect(() =>{
        const getCoinsTable = async() =>{
            setLoading(true)
           const { data }  = await axios.get(CoinList(currency))
           setCoins(data)
           setLoading(false)
        }
        getCoinsTable();
    },[currency])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type: 'dark'
        }
    })

  return (
      <ThemeProvider theme={darkTheme}>
          <Container style={{ textAlign: 'center'}}>
              <Typography
              variant='h4'
              style={{ margin: 18, fontFamily: 'Montserrat'}}
              >
                  Cryptocurrency Prices by Market Gap
              </Typography>
              <TextField 
              label='Search for a Crypto Currency...'
              variant='outlined'
              styel={{ marginBottom: 20, width: '100%'}}
              onChange={(e) => setSearch(e.target.value)}
              />

              <TableContainer>
                  {
                      loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold'}} />  
                      ):(
                          <></>
                      )
                  }
              </TableContainer>
          </Container>
      </ThemeProvider>
  )
}

export default CoinsList