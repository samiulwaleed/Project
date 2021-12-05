import React ,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import profilepic from '../images/About.png'
import {useHistory} from 'react-router-dom'
const About = () => {
    const history = useHistory();
    const [userData, setData]= useState({});

    const callAboutPage = async ()=>{
        try {
            const res= await fetch("/About",{
            
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'     
            })

            const data= await res.json()
            
            console.log(data);
            setData(data);
            
            
            if(!res.status===200){
                const error= new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error)
            history.push('/Signin')
        }
        
    }

    useEffect(() => {
        callAboutPage();
        
    },[])
    
    return (
        
        <>
        <div className="main">
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row  ">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={profilepic} alt="Nadeem" />
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.Name}</h5>
                                <h6>Active🟢</h6>

                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <p  className="nav-link active" >Your Profile</p>
                                    </li>
                                    

                                </ul>
                            </div>

                        </div>

                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"></input><br />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p >:) Have A Good Day !!!</p>
                                
                            </div>
                        </div>

                        <div className="col-md-8 pl-5 about-info">
                            
                                <div className="tab-pane fade show active" id="home" role="tabpanel" area-aria-labelledby="home-tab">
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <p className="field-title">Name</p>
                                        </div>

                                        <div className="col-md-6">
                                            <p className="field-value">{userData.Name}</p>
                                        </div>

                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <p className="field-title">Email</p>
                                        </div>

                                        <div className="col-md-6">
                                            <p className="field-value">{userData.Email}</p>
                                        </div>

                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <p className="field-title">Phone</p>
                                        </div>

                                        <div className="col-md-6">
                                            <p className="field-value">{userData.Phone}</p>
                                        </div>

                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <p className="field-title">Account Type</p>
                                        </div>

                                        <div className="col-md-6">
                                            <p className="field-value">{userData.Type}</p>
                                        </div>

                                    </div>
                                </div>

                        </div>
                    </div>
                </form>
            </div>
            </div>

            var Name ={userData.name};
        </>

    )
}

export default About
