import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { color } from "@mui/system";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem:{
      display: 'flex',
      flexDirection:'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white'
  }
}));

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\D{3})+(?!\D))/g, ",");
}

const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  console.log(trending);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0
    return(
        <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span
        style={{
            color: profit > 0 ? 'rgba(14, 203, 129)' : 'red',
            fontWeight: 400
        }}
        >
          {coin?.symbol}
          &nbsp;
          <span>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 400}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  });
  const responsive = {
    0: {
      items: 2,
    },
    412: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1400}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;