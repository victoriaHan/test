import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import LoginedUserInfo from './components/LoginedUserInfo';
import logo from './assets/logo_motiondesign.png';

const App = () => (
  <BrowserRouter>
    <main className="container">
      <div className="header">
        <a href="https://motiondesign.nz" className="logo"><img src={logo} alt="motiondesign"  /></a>
        <LoginedUserInfo />
      </div>
      <Routes />
    </main>
  </BrowserRouter>
);

export default App;
