import {React,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import signpic from '../images/signup.jpg'
import { NavLink , useHistory} from 'react-router-dom';

const Signup= () => {
    const history = useHistory();
    const  [user, setUser] = useState({Name:"",Email:"",Phone:"",Type:"",Password:"",CPassword:""});

    
    
    let name,value;

    const handleInputs =(e)=>{
        console.log(e);

        name= e.target.name
        value= e.target.value
        setUser({...user,[name]:value})
    }

    const postData= async(e)=>{
        e.preventDefault();
        const {Name,Email,Phone,Type,Password,CPassword}=user

        const res= await fetch ("/Signup",{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
            
                Name,Email,Phone,Type,Password,CPassword
    
            })
        })
            const data = await res.json()

            if(data.status === 422 || !data){
                window.alert("Invalid Registration")
                console.log("Invalid Registration")

            }else{
                window.alert("Successful Registration")

                history.push("/Signin");

            }
        
        
        
    }
    return (
        <div>
        <>
        <div className="main">

        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form" >
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="Name" id="name" 
                                value={user.Name}
                                onChange={handleInputs}
                                placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="Email" id="email" 
                                value={user.Email}
                                onChange={handleInputs}
                                placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><i className="zmdi zmdi-phone"></i></label>
                                <input type="phone" name="Phone" id="phone" 
                                value={user.Phone}
                                onChange={handleInputs}
                                placeholder="Your Phone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="AccType"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="Type" id="AccType" 
                                value={user.Type}
                                onChange={handleInputs}
                                placeholder="Student/Teacher"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="Password" id="pass" 
                                value={user.Password}
                                onChange={handleInputs}
                                placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="CPassword" id="re_pass" 
                                value={user.CPassword}
                                onChange={handleInputs}
                                placeholder="Repeat your password"/>
                            </div>
                            
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" 
                                value="Register" onClick={postData} 

                                />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={signpic} alt="IMG Not Found"/></figure>
                        <NavLink to="/Signin" className="signup-image-link">I am already member</NavLink> 
                    </div>
                </div>
            </div>
        </section>
        
        </div>
        
        </>
        </div>
        
    )
}

export default Signup
