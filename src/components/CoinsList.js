import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import Container from "@material-ui/core/Container";
import {
  createTheme,
  LinearProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { numberWithCommas } from "./Carousel";
import { Pagination } from "@material-ui/lab";
import { display } from "@mui/system";

const useStyles = makeStyles(() => ({
    row:{
        backgroundColor: '#16171a',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: '#131111',
        },
        fontFamily: 'Montserrat'
    },
    pagination:{
        '& .MuiPaginationItem-root':{
            color: 'gold'
        }
    }
}));


const CoinsList = () => {
  const history = useNavigate();
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page,setPage] = useState(1)

  useEffect(() => {
    const getCoinsTable = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    getCoinsTable();
  }, [currency]);
  console.log(coins)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
     return coins.filter((coin) =>
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };


  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Gap
        </Typography>
        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24th Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "Black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {coins
                 .slice((page -1) * 10,(page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => history(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                          <img 
                           src={row.image}
                           alt={row.name} 
                           height= '50'
                           style={{ marginBottom: 10}}
                           />
                           <div
                           style={{ display: 'flex', flexDirection:'column'}}
                           >
                               <span
                               style={{
                                   textTransform: 'uppercase',
                                   fontSize: 22
                               }}
                               >
                                   {row.symbol}
                               </span>
                               <span style={{ color: 'darkgrey'}}>{row.name}</span>
                           </div>
                      </TableCell>
                      <TableCell
                      align='right'
                      style={{
                          color: profit > 0 ? 'rgb(14,203,129)' : 'red',
                          fontWeight: 500
                      }}
                      >
                          {profit && '+'}
                          {symbol}{""}
                          {numberWithCommas(row.price_change_percentage_24h.toFixed(2))}%
                      </TableCell>
                      <TableCell
                      align='right'
                      style={{
                          color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 500
                      }}
                      >
                          {symbol}{""}
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                      align='right'
                      >
                          {symbol}{""}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                          M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table> 
          )}
        </TableContainer>

        <Pagination
        style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}
        classes={{ ul: classes.pagination }}
        count={(coins.length / 10).toFixed(0)}
        onChange={(_, value) =>{
            setPage(value);
            window.scroll(0, 450)
        }}
         />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsList;
