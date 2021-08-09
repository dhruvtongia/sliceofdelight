import moment from 'moment';
import React,{useState,useEffect,useRef} from 'react';
import { useParams,useHistory} from 'react-router-dom';
import  io  from "socket.io-client";
import { baseUrl } from '../Baseurl';

const OrderTracker = () => {
  const orderId=useParams().id;// usepramas has the url params and we named the param as id 
  const [order, setorder] = useState();
  const [socket, setsocket] = useState(null);

  const listRef = useRef(null);
  const completedRef = useRef(null);
  const history=useHistory();

  const getorderdetails=async()=>{
    const res=await fetch(baseUrl+`/customer/orders/${orderId}`,{
          method: 'GET',
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          },
          credentials:'include' // bahut important cookies ko bhejne ke liye taki har request pe nayi cooki na ban jaaye
        });
      const data=await res.json();
        //console.log(data.order);
      if(res.status===200)
      {
        setorder(data.order);
        //console.log(data.order.orderStatus);
        
        if(data.order.orderStatus==='completed')
        {
          completedRef.current.innerHTML="Order Already Completed";
          setTimeout(() => {
            //console.log('in');
           
           history.push('/customer/orders');
          }, 3000);
        }
        listRef.current.childNodes[0].classList.add('current');

      }



  }

  useEffect(() => {
    getorderdetails();
    setsocket(io('/' ));
  }, [])
    
  const updateOrderTracker=(order)=>{

    //console.log(Object(listRef));
    const statuses=listRef.current.childNodes;
    //console.log(listRef.current.childNodes);
    //console.log(listRef.current.childNodes[0].nextElementSibling);
    statuses.forEach((status) => {
      status.classList.remove('step-completed')
      status.classList.remove('current')
  })
  let stepCompleted = true;
  statuses.forEach((status) => {
     let dataProp = status.dataset.status
     if(stepCompleted) {
          status.classList.add('step-completed')
     }
     if(dataProp === order.status) {
          stepCompleted = false
          //time.innerText = moment(order.updatedAt).format('hh:mm A')
          //status.appendChild(time)
        //  if(status.nextElementSibling) {
        //   status.nextElementSibling.classList.add('current')
        status.classList.add('current')
         
         }
     
  })
    
  }
  useEffect(() => {
    //console.log(order);
    socket?.emit('join',order?(`order_${order._id}`):null);

    socket?.on('orderUpdated',(data)=>{
      //console.log("innnn");
      //console.log(data);

      const updatedorder={...order};
      updatedorder.status=data.status;
      updatedorder.updatedAt=moment().format();

      updateOrderTracker(updatedorder);


    })
    
  }, [socket,order])



    return (
        <>
        <section className="status">
    <div className="container mx-auto">
        <div className="status-box  mx-auto">
            <div className="d-flex items-center justify-content-between mb-3">
                <div> <h1 >Track delivery status</h1></div>
                <div><h6 className="bg-secondary  rounded-pill px-5 text-center text-light py-3 ">{orderId}</h6></div>
            </div>
            < div class="mb-3" ref={completedRef} style={{color: "red"}}> </div>
            <ul ref={listRef} className="list-group" style={{listStyle:"none"}}>
                <li  className="status_line text-sm md:text-xl pb-5  " data-status="order_placed"><span>Order Placed</span>
                </li>
                <li  className="status_line text-sm md:text-xl pb-5 " data-status="confirmed"><span>Order confirmation</span>
                </li>
                <li  className="status_line text-sm md:text-xl pb-5" data-status="prepared"><span>Preparation</span></li>
                <li  className="status_line text-sm md:text-xl pb-5" data-status="delivered"><span>Out for delivery </span>
                </li>
                <li  className="status_line text-sm md:text-xl" data-status="completed"><span>Complete</span></li>
            </ul>
            
        </div>
    </div>
</section>
            
        </>
    )
}

export default OrderTracker
