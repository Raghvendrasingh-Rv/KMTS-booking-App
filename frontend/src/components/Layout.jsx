import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Layout = (props) => {

    const navigate = useNavigate();

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        toast.success('You have successfully logged out!');
        navigate('/login');
    }

  return (
    <>
        <div className='header'>
            <div className='col'>
                <a href="/" className='logo' style={{color:"white"}}>Kushal Mangal Transport Service</a>
            </div>
            <div className="col">
                <span className='name' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:"10px", backgroundColor:"white"}}>{(userInfo?.username)}</span>
                {userInfo ? (
                    <span onClick={logoutHandler} className='logout' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:"10px",backgroundColor:"white"}}>Logout</span>
                ) : (
                    <a href="/login" className='login' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:"10px"}}>Login</a>
                )}
                
            </div>
            
            
        </div>
        <div className='main'>
            {props.children}
        </div>
        <div className='footer' style={{backgroundColor:"black",color:"white",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div style={{margin:"30px",backgroundColor:""}}>
                <div><p style={{fontSize:"30px",fontWeight:"bold"}}>Mr. Kushal Mangal Singh (Owner)</p></div>
                <div style={{display:"flex",margin:"0px"}}><p style={{width:"50%"}}>Mobile  :   8860285330 , 43948390840</p>
                <p style={{width:"50%"}}>Address  :  MS - 14 B, M.S. Block, Hari Nagar, Near C.N.G Petrol Pump, Maya Puri Main Road, Delhi-110064, India</p></div>
            </div>
            <div style={{textAlign:"center"}}>
                <p>&copy;2022. All rights reserved. Powered by KMTS.</p>
            </div>
        </div>
    </>
  )
}

export default Layout