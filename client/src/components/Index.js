import React,{useEffect} from 'react'

const Index = ({getMenu,userLoggedin,setcartCounter,menu}) => {

    useEffect(() => {
      getMenu();
    },[]);

const updateCart=(pizza)=>{

  fetch("https://sliceofdelight.herokuapp.com/update-cart", {
        method: 'POST',
        body:pizza,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
       credentials:'include' 
      })
      .then(response => response.json())
      .then(data => {
                        setcartCounter(data.data.totQty);

                    })
      .catch(err => console.log(err));
};

const addToCart=(e)=>{

 updateCart(e.target.dataset.pizza);
} 

const removeMenu=(e)=>{

  const menuId=e.target.dataset.menuid;

  fetch('https://sliceofdelight.herokuapp.com/',{

    method:'delete',
    headers:{
      "Content-type": "application/json; charset=UTF-8"
    },
    body:JSON.stringify({menuId}),
    credentials:'include'
  })
  .then(res=>res.json())
  .then(data=>{
      getMenu();
  })
  .catch(err=>console.log(err));
}

    return (
        <>
   <div className="main-section container-fluid">
      <div className="left mx-5 ">
        <h1><em>Are you hungry ?</em></h1>
        <h1>Dont Wait</h1>
        <div className=" rounded-pill px-3 " style={{color:"white", backgroundColor: "tomato", borderStyle: "none",width:"fit-content"}} to="/">Order Now</div>
      </div>
  
      <div className="right my-4 mx-4">
        <img  src="img/hero-pizza.png" alt="" id="hero-pizza"/>
      </div>
    </div>
    <div className="container">
      <h1>All Pizzas</h1>
      <div className="menu  mt-4 " id="menu">
        {  menu?menu.map((item)=>{ return( 
            <div className="single-card text-center  mb-4">
                <div className="item-img">
                  <img style={{height: "100px", width: "100px"}}  src="img/pizza.png" alt=""/>
                </div>
                <div className="desc ">
                  <h3>{item.name}</h3>
                  <h3>pizza</h3>
                  <span className="text-xs  px-4 py-1  rounded-pill " style={{backgroundColor: "#d3d3d3"}}>{item.size}</span>
                  <div className="d-flex flex-row justify-content-around mt-3 mb-5">
                    <div > Rs {item.price}</div>
                    <div><button data-pizza={ JSON.stringify(item)} onClick={addToCart}  className="add-to-cart rounded-pill px-3">+  Add</button></div>
                  </div>
                  <div>
                    {
                      (userLoggedin&&userLoggedin.role==='admin')?<button className="mb-5" data-menuid={item._id} onClick={removeMenu} className="btn btn-danger mt-4 px-3">Remove</button>:''
                    } 
                  </div>
                </div>
              </div>
        )})
          :''}
        
      </div>
    </div>
    </>
    )
}

export default Index
