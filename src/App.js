import React from 'react';
import {Route} from 'react-router-dom' 
import './App.css';
import Main from './component/main';
import CarPostMain from './component/user-component/car-post-main';
import PoliceMain from './component/police-component/police-main';
import AfterLogin from './component/after-police-login/after-police-login';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Main}/>
      <Route path="/user/post" component={CarPostMain}/>
      <Route path="/police/login" component={PoliceMain}/>
      <Route path="/police/after_login" component={AfterLogin}/>
    </div>
  );
}

export default App;
