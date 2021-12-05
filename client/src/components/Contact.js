import React ,{useEffect,useState}from 'react'

import 'bootstrap/dist/css/bootstrap.css';

const Contact = () => {

    const [userData, setData]= useState({Name:"",Email:"",Phone:"",Subject:"",Message:""});

    const userContact = async ()=>{
        try {
            const res= await fetch("/userdata",{
            
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }    
            })

            const data= await res.json()

            setData({...userData,Name:data.Name,Email:data.Email,Phone:data.Phone})
            
            
            if(!res.status===200){
                const error= new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error)
            
        }
        
    }

    useEffect(() => {
        userContact();
        
    },[])

    

    const handleInputs =(e)=>{
    
      const name= e.target.name
       const  value= e.target.value
        setData({...userData,[name]:value})
    }

    const contactform= async(e)=>{
      e.preventDefault();
        
        const Name= userData.Name;
        const Phone= userData.Phone;
        const Email= userData.Email;
        const Subject= userData.Subject;
        const Message= userData.Message;

     //const [Name,Email,Phone,Subject,Message]= userData;

      const res= await fetch ("/Contact",{
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
        
            Name,Email,Phone,Subject,Message

        })
    })
        const data = await res.json()

        if(!data){
          window.alert("Message not send")
          console.log("Message not send")

      }else{
          window.alert("Message Sent Successfully")

         setData({...userData,Message:""})

      }


    }
    return (
        <div>
            <>
     
    <div className="main">
    <div className="container"></div>
      <div className="row align-items-stretch justify-content-center no-gutters">
        <div className="col-md-7">
          <div className="form h-100 contact-wrap p-5">
            <h3 className="text-center">Get in Touch</h3>
            <form className="mb-5" method="POST" id="contactForm" name="contactForm">
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name="Name" id="Name" 
                onChange={handleInputs} 
                value= {userData.Name}  placeholder="Your Name"/>                
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label htmlFor="Phone"><i className="zmdi zmdi-phone"></i></label>
                    <input type="Phone" name="Phone" id="Phone" 
                    onChange={handleInputs} 
                    value= {userData.Phone}  placeholder="Your Phone"/>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-3">
                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                <input type="email" name="Email" id="Email" 
                onChange={handleInputs}
                value= {userData.Email} placeholder="Email"/>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-3">
                <label htmlFor="subject"><i className="zmdi zmdi-settings zmdi-hc-spin"></i></label>
                <input type="subject" name="Subject" id="Subject" 
                onChange={handleInputs} 
                value={userData.Subject}
                placeholder="Subject"/>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-12 form-group mb-3">
                  
                  <textarea className="form-control" name="Message" id="Message" cols="30" rows="4"  
                  onChange={handleInputs} 
                  value={userData.Message} placeholder="Write your message"></textarea>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-5 form-group text-center">
                <input type="submit" 
                onClick={contactform}
                  value="Send Message" className="form-submit"/>
                  <span className="submitting"></span>
                </div>
              </div>
            </form>

            <div id="form-message-warning mt-4"></div> 
            <div id="form-message-success">
              Your message was sent, thank you!
            </div>

          </div>
        </div>
      </div>
    </div>

  
            </>
        </div>
    )
}

export default Contact
