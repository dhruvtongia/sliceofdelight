import React,{useState,useRef} from 'react'
import { useHistory } from 'react-router';

const Adminaddmenu = ({userLoggedin}) => {

  const history=useHistory();
  
  if(userLoggedin&&userLoggedin.role==='customer')
  {
    history.push('/');
  }

const [item, setitem] = useState({name:"",price:"",size:"",image:"pizza.png"});
const messageRef = useRef(null);

const changeHandler=(e)=>{
   

    setitem(previtem => ({
        ...previtem,
        [e.target.name]: e.target.value
    }));
}

const submitForm=async(e)=>{
    e.preventDefault();

    const res=await fetch('https://sliceofdelight.herokuapp.com/admin/add-menu', {

      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
          },
      body:JSON.stringify(item),
     credentials:'include'

    });

   const data= await res.json();
   
    messageRef.current.innerHTML=data.message;

}
    return (
        <>
<div className="container-sm" style={{maxWidth:"60%"}}>
    <form method="POST" onSubmit={submitForm}>
    < div class="mb-3" ref={messageRef} style={{color: "red"}}> </div>
    <div className="mb-3 mt-3">
      <label  className="form-label">Name</label>
      <input type="text" className="form-control" value={item.name} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" name="name" required/>
    </div>
    <div className="mb-3 mt-3">
      <label  className="form-label">Size</label>
      <input type="text" className="form-control" value={item.size} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" name="size" required/>
    </div>
    <div className="mb-3 mt-3">
      <label  className="form-label">Price</label>
      <input type="text" className="form-control" value={item.price} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" name="price" required/>
    </div>
    <button type="submit" className="btn btn-primary">+ Add</button>
  </form>
</div>
    </>
    )
}

export default Adminaddmenu
