import React,{useEffect,useState} from 'react'
import {NavLink,useHistory} from 'react-router-dom';
import moment from "moment";


const Orders = ({setcartCounter}) => {

    const [Orders, setOrders] = useState();
    const history=useHistory();

    const getOrders=async()=>{

      try {
        const res=await fetch('https://sliceofdelight.herokuapp.com/customer/orders',{
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials:'include' 
          });

           const data=await res.json();
           if(res.status===400)
           {
               history.push('/');
           }
           else
           {
               setOrders(data.orders);
               setcartCounter(0);
           }
        
      } catch (error) {
        history.push('/');
      }
        
    }
    useEffect(() => {
    
        getOrders();
        
    }, []);

    const renderItems=(items)=> {
      let parsedItems = Object.values(items)
      return parsedItems.map((menuItem) => {
          return (<p>{ menuItem.item.name } - { menuItem.qty } pcs </p>)
          
      })
    }
    return (
        <>
        <div className="container">
        <h1 className="mt-3 mb-3">All Orders</h1>
        
        <table className="table  table-light table-stripped">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Address</th>
                <th scope="col">TIme</th>
              </tr>
            </thead>
            <tbody>
              { Orders?Orders.reverse().map((order)=>{ return (
                <tr >
                    <td>
                      <NavLink to={`/customer/orders/${order._id}` }  style={{textDecoration: "none", color: "tomato"}}>{order._id}</NavLink>
                      <p>{ renderItems(Object(order.items)) }</p>
                     </td>
                    <td>{order.address}</td>
                    <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                </tr>
              )
                })
              :<tr></tr>
            }
            </tbody>
          </table>
        
    </div>
        </>
    )
}

export default Orders
