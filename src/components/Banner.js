import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: 'url(./banner2.jpg)' 
    },
    bannerContent:{
        height: '400',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 24,
        justifyContent: 'space-around'
    }
}))
const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>

        </Container>
    </div>
  )
}

export default Banner