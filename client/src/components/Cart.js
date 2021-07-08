import React,{useState,useEffect} from 'react'
import {NavLink,useHistory } from 'react-router-dom'

const Cart = ({setcartCounter,userLoggedin}) => {

    const history=useHistory();
    const [cartItems, setcartItems]=useState();
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(() => {
        
        fetch('https://sliceofdelight.herokuapp.com/cart',{
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials:'include' // to send cookies
      })
       .then(response => response.json())
       .then((result)=>{
        setloading(false);
         setcartItems(result.data);
       }).catch(err=>{
         console.log(err);
       });
        
    }, []);

    const placeOrder=async(e)=>{

        e.preventDefault();
        try{
        const res= await fetch('http://localhost:5000/orders',{
            method: 'POST',
            body:JSON.stringify({address,phone}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
           credentials:'include' 
        });
        const data=await res.json();
        
            console.log(data);
            if(res.status===201)
                history.push('/customer/orders');
        
    }catch(err){
        console.log(err);
    }

    }

    const removeItem=(e)=>{

        const itemId=e.target.dataset.item;
        fetch('http://localhost:5000/cart',{

        method:'delete',
        body:JSON.stringify({itemId}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials:'include'
        })
        .then((res)=>res.json())
        .then(result=>{
           
            setcartItems(result.data);
            setcartCounter(result.data.totQty);
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    if(loading)
    {
        return ( <div class="text-center mt-5">
        <div class="spinner-border" role="status">
         
        </div>
      </div>);
    }
    return (
        
       
        <>
            { (!cartItems||cartItems.totQty===0)?
                <section >
                    <div className="container empty-cart text-center">
                        <h1>This cart is empty</h1>
                        <h5>to order a pizzza go to home 😋</h5>
                        <img src="img/empty-cart.png" style={{width: "40%"}} alt=""/>
                    </div>
                </section>
            
            :
            <section>
                    <div className="container">
                        <img  src="img/cart-black.png" alt=""/>
                        <h1 style={{display:"inline-block"}} >Order Summary</h1>
                        <hr/>
                    
                    </div>

                    {

                    Object.values(cartItems.items).map((pizza)=>{return (
                        
                        <div className="d-flex flex-row justify-content-around align-items-center bg-light py-3">
                            <div className="d-flex flex-row ">
                                <div><img src="img/pizza.png" style={{height: "100px", width: "100px" }}alt=""/></div>
                                <div className="d-flex flex-column mt-3 ms-3">
                                    <span className="fw-bold fs-3">{pizza.item.name}</span>
                                    <span>{pizza.item.size}</span>
                                </div>
                            </div>
                            <div>{pizza.qty}</div>
                            <div>{pizza.item.price*pizza.qty}</div>
                            <div><button onClick={removeItem} data-item={pizza.item._id} className="btn btn-danger btn-sm">X</button></div>
                        </div>
                        )})
                    }
                    
                       
                    <hr/>
                    <div className="container text-end">
                        <h3>Total Amount: Rs {cartItems.totPrice}</h3>
                        {
                        (userLoggedin)?(
                        <form  method="POST" onSubmit={placeOrder}>
                            <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} name="address" className="form-control-sm mb-4  " placeholder="Address" required/>
                            <input type="text" value={phone} onChange={(e)=>setphone(e.target.value)} name="phone_number" className="form-control-sm mb-4  " placeholder="phone number" required/>
                            <button type="submit" className=" rounded-pill py-1 px-3 justify-content-end">Order Now</button>
                        </form>
                        ):(
                        <div> <NavLink to="/login"><button className=" rounded-pill py-1 px-3 justify-content-end">Login to continue</button></NavLink></div>
                        )
                        }

                    </div>
                
                
                
            </section>
            
            }
        
        </>
    
    )
}

export default Cart
