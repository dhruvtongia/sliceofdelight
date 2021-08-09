import React,{useRef} from 'react'
import moment from 'moment'
import { baseUrl } from '../Baseurl';
const Orderstatus = ({order,setorders ,getAdminOrders}) => {

    const currentStatus=(order.orderStatus);

    const inputRef = useRef('');
    const renderItems=(items)=> {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return (<p>{ menuItem.item.name } - { menuItem.qty } pcs </p>)
            
        })
      }

    const updateStatus=(e)=>{
        const orderId=inputRef.current.value;
        const status=e.target.value;
        fetch(baseUrl+'admin/orders/status', {
        method: 'POST',
        body:JSON.stringify({orderId,status}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
       credentials:'include' 
      })
      .then(response => response.json())
      .then(data => {
                    
                        getAdminOrders();

                    })
      .catch(err => console.log(err));


        
    }

    

    return (
        <>
        
        <tr>
          <td className="border px-4 py-2 text-green-900">
              <p>{ order._id }</p>
                <div>{ renderItems(Object(order.items)) }</div>
              
          </td>
          <td className="border px-4 py-2">
              <div className="inline-block relative w-64">
                  <form  method="POST" >
                      <input type="hidden" name="orderId" ref={inputRef} value={ order._id }/>
                      <select name="status" onChange={updateStatus}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 
                          py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {  (currentStatus === "order_placed" ? <option value="order_placed" selected >
                        Placed</option> : <option value="order_placed" >
                        Placed</option>) }
                        {(currentStatus === "confirmed" ? <option value="confirmed" selected >
                        Confirmed</option> : <option value="confirmed" >
                        Confirmed</option>) }
                        {  (currentStatus === "prepared" ? <option value="prepared" selected >
                        Preparing</option> : <option value="prepared" >
                        Preparing</option>) }
                        {  (currentStatus === "delivered" ? <option value="delivered" selected >
                        Delivering</option> : <option value="delivered" >
                        Delivering</option>) }
                        {  (currentStatus === "completed" ? <option value="completed" selected >
                              Completed</option> : <option value="completed" >
                              Completed</option>) }
                      </select>
                  </form>
              </div>
          </td>
          <td className="border px-4 py-2">{ Object(order.customerId).name }</td>
          <td className="border px-4 py-2">{ order.phone }</td>              
          <td className="border px-4 py-2">{ order.address }</td>
          <td className="border px-4 py-2">
              {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </td>
      </tr>
      </>
  
    )
}

export default Orderstatus
