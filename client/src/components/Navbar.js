import { NavLink } from 'react-router-dom';
import React ,{useContext}from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../images/logo.png'
import { UserContext } from '../App';
const Navbar = () => {
  const {state,dispatch} = useContext(UserContext)
  const RenderMenu =()=>{
    
    if( state ){
      return(
        <>
              

              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link " to="/Dashboard">Dashboard</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/About">Profile</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Contact">Contact Us</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Logout">Log Out</NavLink>
              </li>

        </>
      )
    }else{
      return(
      <>
             <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/About">Profile</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Contact">Contact Us</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Signin">Login</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Signup">Register</NavLink>
              </li>
      </>
      )
    }
    
  }  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/Home"><img src={logo} alt=""></img><span style={{fontWeight:'bold'}}>WFR-<span style={{ color: "#42fcfc"}}>LEARNING</span></span></NavLink>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <RenderMenu />

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
