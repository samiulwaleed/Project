import React, { useState ,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Loginpic from '../images/signin.jpg'
import { useHistory} from 'react-router-dom';
import { UserContext } from '../App';



const Signin= () => {
    
    const {state,dispatch} = useContext(UserContext)

    const history= useHistory();
    const [Email,setEmail]= useState('');
    const[Password, setPassword]= useState('');

    const loginUser = async (e)=>{
        e.preventDefault();
        const res = await fetch('/Signin',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body:JSON.stringify({
                Email,
                Password
            })
        })
        const data= res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials!!")

        }
        else{

            dispatch({type:"USER",payload:true})
            window.alert("Login Successful !!")
            history.push('/')

        }
    }
    return (
        <div>
        <>
        <div className="main">
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={Loginpic} alt="signin"/></figure>
                        <a href="/Signup" className="signup-image-link">Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Log In</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="Email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="Email" id="Email" 
                                value={Email}
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="Password" id="Password" 
                                value={Password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder="Password"/>
                            </div>
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" 
                                onClick={loginUser}
                                className="form-submit" value="Log in"/>
                            </div>
                        </form>
                        {/*<div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>*/}
                    </div>
                </div>
            </div>
        </section>

    </div>
        </>
        </div>
    )
}


export default Signin
