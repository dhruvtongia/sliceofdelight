import React,{useState,useEffect} from 'react'
import {useHistory } from 'react-router-dom';
import Orderstatus from './Orderstatus'


const Admin = () => {

  const history =useHistory();
  const [orders, setorders] = useState();

  const getAdminOrders=async()=>{
        try {
            const res=await fetch('http://localhost:5000/admin/orders', {
            method:'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials:'include'
            
          });

          const data=await res.json();

          if(res.status===200)
          {
          setorders(data.orders);

          }
          else
          {
            history.push('/');
          }
      }catch (error) {
          history.push('/');
      }

  }
  useEffect(() => {
   getAdminOrders();
   
  },[]);
 

    return (
     
  <>
    <div className="container">
        <h1 className="mt-3 mb-3">All Orders</h1>
        <table id="adminTable" className="table table-light table-stripped">
            <thead>
              <tr>
                <th scope="col">Orders</th>
                <th scope="col">Status</th>
                <th scope="col">customer</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">Placed at</th>
              </tr>
            </thead>
            <tbody >
              { 
                orders? orders.map((order)=>{ return (

                 <Orderstatus order={order}  getAdminOrders={getAdminOrders} />
                )}):''
              } 
            </tbody>
        </table>
          
        
    </div>

  </>
  
    )
}

export default Admin
