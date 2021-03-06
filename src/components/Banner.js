import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core'
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: 'url(./banner2.jpg)'
    },
    bannerContent:{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around'
    },
    tagline:{
        dispay: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }

}))
const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
               <Typography
               variant='h2'
               style={{
                   fontWeight: 'bold',
                   marginBottom: 14,
                   fontFamily: 'Montserrat'
               }}
               >
                   Crypto Hunter
                </Typography>  
                <Typography
               variant='subtitle2'
               style={{
                   color: 'darkgrey',
                   textTransform: 'capitalize',
                   fontFamily: 'Montserrat'
               }}
               >
                 Get all the Info about your favorite Crypto Currency
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner