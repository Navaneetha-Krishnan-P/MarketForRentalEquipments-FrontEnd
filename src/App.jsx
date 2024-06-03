import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import { Header } from './My_Components/Webpage/Header';
import { Navbar } from './My_Components/Webpage/Navbar';
import { LogIn } from "./My_Components/User_Info/LogIn";
import { SignUp } from "./My_Components/User_Info/SignUp";
import ForgotPassword from "./My_Components/User_Info/ForgotPassword"
import Home from "./My_Components/Webpage/Home";
import About from "./My_Components/Webpage/About";
import WashingMachines from "./My_Components/Products/WashingMachines";
import Fridges from "./My_Components/Products/Fridges";
import Fans from "./My_Components/Products/Fans";
import AirCoolers from "./My_Components/Products/AirCoolers";
import Cars from "./My_Components/Products/Cars";
import Bikes from "./My_Components/Products/Bikes";
import Buses from "./My_Components/Products/Buses";
import Admin from "./My_Components/User_Info/Admin";
import AdminProducts from "./My_Components/User_Info/AdminProducts";
import { Booknow } from "./My_Components/Webpage/Booknow";
import Ender from "./My_Components/Webpage/Ender";

let server = 'http://localhost:5001';

function App() {
  const [allproducts, setAllproducts] = useState([]);
  const [dataFromSearch, setDataFromSearch] = useState('');
  const [loginShow, setLoginShow] = useState(false);

  const handleDataFromSearch = (data) => {
    setDataFromSearch(data);
  };

  const handleLoginShow = (data1) => {
    setLoginShow(data1);
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(server + '/productDetails');
        console.log('response.data: ', response.data);
        setAllproducts(response.data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header loginShow={handleLoginShow} login={loginShow}/>
      <Navbar onData={handleDataFromSearch} />
      <Routes>
        <Route path="/logIn" element={<LogIn LoginShow={handleLoginShow} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/" element={<Home products={allproducts} searchData={dataFromSearch} />} />
        <Route path="/about" element={<About />} />
        <Route path="/booknow" element={<Booknow />} />
        <Route path="/cars" element={<Cars products={allproducts} />} />
        <Route path="/bikes" element={<Bikes products={allproducts} />} />
        <Route path="/buses" element={<Buses products={allproducts} />} />
        <Route path="/washingMachines" element={<WashingMachines products={allproducts} />} />
        <Route path="/fridges" element={<Fridges products={allproducts} />} />
        <Route path="/fans" element={<Fans products={allproducts} />} />
        <Route path="/airCoolers" element={<AirCoolers products={allproducts} />} />
      </Routes>
      <Ender />
    </>
  );
}

export default App;




