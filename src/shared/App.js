import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import { Login, Main,Signup } from '../pages/index';
import {MobileFrame} from '../components/home';

//css 
import '../shared/css/App.css';

function App() {
  return (
    <>
    <Wrap>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Login}  />
        <Route path='/signup' exact component={Signup} />
        <MobileFrame className="MobileFramePage">
          <Route path='/main' exact component={Main} />
        </MobileFrame>
      </ConnectedRouter>
    </Wrap>
    </>
  );
}

const Wrap=styled.div`
   width: 100vw;
  height: 100vh;
  .MobileFramePage {
    z-index: 999;
  }

`;

export default App;