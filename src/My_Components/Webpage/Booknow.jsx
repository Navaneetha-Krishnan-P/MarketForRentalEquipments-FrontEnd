import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
let server = 'https://marketforrentalequipments-backend-1.onrender.com';

export const Booknow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const total = product.price.split('/')[0];

  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  const handleFullname = (e) => {
    setFullname(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleTotalDays = (e) => {
    setTotalDays(e.target.value);
  };

  const handleConfirmOrder = async () => {
    if (fullname.trim() === "" || address.trim() === "" || fromDate.trim() === "" || toDate.trim() === "" || totalDays.trim()==="") {
      alert("Enter all Fields");
      return;
    }
      else if(isNaN(totalDays)){
       alert("Total No.of. Days should be a integer")
      } 

    const totalAmount = Math.round(total * totalDays * 100);

    if (isNaN(totalAmount) || totalAmount < 100) {
      alert("Total amount should be atleast Rs 1 (100 paise)");
      return;
    }

    try {
      const orderResponse = await axios.post(server + '/createOrder', { amount: totalAmount });
      const order = orderResponse.data;
      console.log('order: ', order);

      if (window.Razorpay) {
        const options = {
          key: 'rzp_test_HPtpbhH8zAW0B5',
          amount: totalAmount,
          currency: 'INR',
          name: product.name,
          description: 'Product Purchase',
          order_id: order.id,
          handler: async (response) => {
            try {
              await axios.post(server + '/updateProductAvailability', { id: product.id, available: false });
              navigate('/');
            } catch (error) {
              console.error('Error updating product availability:', error);
            }
          },
          prefill: {
            name: fullname,
            email: 'customer@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error('Razorpay SDK not available');
      }
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
 };


  return (
    <div>
      <div className='cards'>
        <div className="card mb-3" style={{ maxWidth: "700px" }}>
          <div className="row no-gutters">
            <div className="col-md-5">
              <img className="image" src={product.image} alt={product.name} />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title"><b>{product.name}</b></h5>
                <p className="card-text"><small className="text-muted">{product.type}</small></p>
                <p className='price'>Rs {product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='userinfo' style={{color:"red"}}><p><b>For Order Confirmation, Enter all the below Details !</b></p></div>

      <div className='login'>
        <form className='userinfo'>
          <div className="form-group">
            <label htmlFor="name"><b>Full Name</b></label><br />
            <input type="text" id="name" value={fullname} onChange={handleFullname} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1"><b>Address for Delivery</b></label><br />
            <textarea style={{ width: "300px" }} className="textarea" placeholder='Kindly enter your full address,it will be used for your delivery ! ' value={address} onChange={handleAddress} id="exampleFormControlTextarea1" rows="3" ></textarea>
          </div>

          <div>
            <label htmlFor="dateInput"><b>From Date</b></label><br />
            <input type="date" id="dateInput" value={fromDate} onChange={handleFromDate} name="dateInput" />
          </div><br />

          <div>
            <label htmlFor="dateInput"><b>To Date</b></label><br />
            <input type="date" id="dateInput" value={toDate} onChange={handleToDate} name="dateInput" />
          </div><br />

          <div className="form-group">
            <label htmlFor="days"><b>Total No.of Days / Months</b></label><br />
            <input type="text" id="days" value={totalDays} onChange={handleTotalDays} /><br />
          </div><br />

          <div><b>Total Amount = Rs {total * totalDays} </b></div><br />

          <div>
            <button type="button" className="btn btn-success" onClick={handleConfirmOrder}><b>Pay to Confirm Order</b></button>
          </div><br/>
          <p>
             Your order will be delivered to your address on time !
          </p>

        </form>
      </div>
    </div>
  );
};








