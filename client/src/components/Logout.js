import React,{useEffect,useContext} from 'react'
import {useHistory} from "react-router-dom"
import { UserContext } from '../App';

const Logout = () => {
    const {state,dispatch} = useContext(UserContext)
    // using Promises
    const history= useHistory();

    

    useEffect(()=>{

        fetch('/logout',{
            
            method: "GET",
            headers:{     
                "Content-Type": "application/json"
            }
        }).then((res)=>{
        
           dispatch({type:"USER",payload:false})
           history.push("/Signin",{replace:true})
            
            if(res.status !== 200){
                const error= new Error(res.error);
                throw error;
            }
          
        }).catch((error)=>{
            
            console.log(error)
        });
        

    })
    return (
        <div>
            
        </div>
    )
}

export default Logout
