import React from 'react'
import "../My_Styles/Header.css"
import { Link } from 'react-router-dom'
import { SiPrestashop } from "react-icons/si";

export const Header = ({login}) => {
  return (
    <header className="bg-dark py-1">
      <div className="container px-3 px-lg-5 my-5">
        <div className="text-center text-white">
          <div className='for_flex'>
            <h1 className="display-6 fw-bolder"><SiPrestashop size={80}/>&nbsp;&nbsp;&nbsp; Market for Rental Equipments</h1>
            {!login ?
            <div>
              <Link to={"/logIn"}><button type="button" className="btn btn-success">Log In</button></Link>&nbsp;&nbsp;&nbsp;
              <Link to={"/signUp"}><button type="button" className="btn btn-info">Sign Up</button></Link>
            </div>:null}
          </div>
        </div>
      </div>
    </header>
  )
}
