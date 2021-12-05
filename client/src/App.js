import React, { createContext ,useReducer} from 'react'
import { Route} from "react-router";

import 'bootstrap/dist/css/bootstrap.css';
//import Errorpage from '../src/components/Errorpage'
import Navbar from '../src/components/Navbar'
import About from '../src/components/About'
import Home from '../src/components/Home'
import Signup from '../src/components/Signup'
import Signin from '../src/components/Signin'
import Contact from '../src/components/Contact'
import Logout from '../src/components/Logout'
import {initialState,reducer} from '../src/Reducer/UseReducer'
import './App.css'
import Dashboard from './components/Dashboard';

//Context API
export const UserContext= createContext();

const Routing =()=>{
  return(
    <>
    <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/Dashboard'>
        <Dashboard />
      </Route>

      <Route exact path='/home'>
        <Home />
      </Route>

      <Route path='/About'>
        <About />
      </Route>

      <Route path='/Contact'>
        <Contact />
      </Route>

      <Route path='/Signup'>
        <Signup />
      </Route>

      <Route path='/Signin'>
        <Signin />
      </Route>

      <Route path='/Logout'>
        <Logout />
      </Route>
    </>
  )
}
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routing />
        </UserContext.Provider>
      
    </>

  )
}

export default App
