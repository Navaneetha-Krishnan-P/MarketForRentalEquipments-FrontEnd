import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
let server = 'https://marketforrentalequipments-backend-1.onrender.com'


const Admin = () => {

    const[adminId,setAdminId]=useState("")
    const[adminEmail,setAdminEmail]=useState("")
    const[adminPw,setAdminPw]=useState("")
    const[adminShow,setAdminShow]=useState(false)


    const handleAdminId=(e)=>{
        setAdminId(e.target.value)
    }
    const handleAdminEmail=(e)=>{
        setAdminEmail(e.target.value)
    }
    const handleAdminPw=(e)=>{
        setAdminPw(e.target.value)
    }

    const handleAdminSubmit = async(e) =>{
        e.preventDefault();  
            let response = await axios.get(server+'/admin')
            console.log("admin",response)
            if(adminId===response.data[0].AdminId && adminEmail===response.data[0].AdminEmail && adminPw===response.data[0].AdminPassword ){
                setAdminShow(true)
            }else{
                alert("Check your Credentials")
            }}


  return (
    <div className='login'>
         <div>
            { !adminShow ?
            <div className='userinfo'>
                <form>
                    <p style={{color:"red"}}>Note : "This is only for Admins"</p><br/>
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1"><b>Admin ID</b></label><br />
                        <input
                            type="text"
                            value={adminId}
                            id="adminId"
                            onChange={handleAdminId}
                        /><br />
                        <small id="emailHelp" className="form-text text-muted">Enter your Admin ID</small>
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"><b>Admin Email Address</b></label><br />
                        <input
                            type="email"
                            value={adminEmail}
                            id="exampleInputEmail1"
                            onChange={handleAdminEmail}
                        /><br />
                        <small id="emailHelp" className="form-text text-muted">Enter your Admin Email Address</small>
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="inputPassword5"><b>Admin Password</b></label><br />
                        <input
                            type="password"
                            value={adminPw}
                            id="inputPassword5"
                            onChange={handleAdminPw}
                        /><br />
                        <small id="emailHelp" className="form-text text-muted">Enter your Admin Password</small>
                    </div><br />
                    <div className='buttongroup'>
                        <button onClick={handleAdminSubmit} className="btn btn-danger">Log In</button>
                    </div>
                </form>
            </div>
            :
            <div className='userinfo'>
                <h4 style={{color:"green"}}>Admin Login Successful !</h4><br/>
                <Link to={"/adminProducts"}><button type="button" className="btn btn-outline-dark"><b>Go to Admin Page</b></button></Link>
            </div>}
        </div>
    </div>
  )
}
export default Admin;


