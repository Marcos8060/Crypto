import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'

const CoinsList = () => {
    const { currency } = CryptoState();
    const [coins,setCoins] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        const getCoinsTable = async() =>{
           const { data }  = await axios.get(CoinList(currency))
           setCoins(data)
        }
        getCoinsTable();
    },[])
    console.log(coins)

  return (
    <div>CoinsList</div>
  )
}

export default CoinsList