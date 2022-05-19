import { makeStyles } from '@material-ui/core';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coin from './pages/Coin';
import Home from './pages/Home';

function App() {


  return (
      <BrowserRouter>
        <div className='app'>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/coins/:id" element={<Coin />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
