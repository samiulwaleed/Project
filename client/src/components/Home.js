import React,{useState,useEffect}from 'react'
import homepic from '../images/home.jpg'

const Home = () => {

    const [username, setUsername]= useState('');

    const [show, setshow] =useState(false)

    const userHome = async ()=>{
        try {
            const res= await fetch("/userdata",{
            
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }    
            })

            const data= await res.json()

            setUsername(data.Name)
            setshow(true);
            
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    useEffect(() => {
        userHome();
        
    }, [])
    return (
        <>

        <div className="home-page row">

            <div className="home-div col-md-6">
                    <p >WELCOME</p>
                    <h1>{username}</h1>
                    <h2>{show? 'Happy,to see you back': 'Have a Good Day !!'}</h2>

            </div>

            

            <div className="col-md-6 h-pic" >
                <img  src={homepic} alt="HomePage" />

            </div>




        </div>

        </>
    )
}

export default Home
