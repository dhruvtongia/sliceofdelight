import React,{useState,useRef} from 'react'
import {useHistory} from 'react-router-dom'


const Register = () => {
  const history=useHistory();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const messageRef = useRef(null);
 

  const register=async(e)=>{
    e.preventDefault();
    
    const res=await fetch('https://sliceofdelight.herokuapp.com/register', {

      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
          },
      body:JSON.stringify({
        name,
        email,
        password
      }),
     credentials:'include'

    });

   const data= await res.json();
    console.log(data);
    messageRef.current.innerHTML=data.message;
      if((res.status===201))
        history.push('/login');
     
   
  }
    return (
      <>
        <div className="container-sm " style={{maxWidth:"60%"}}>
            <form method="POST" onSubmit={register}>
            <div className="mb-3" ref={messageRef} style={{color: "red"}}> </div>
              <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input type="text" className="form-control" value={name}
                          onChange={(e)=>{setname(e.target.value)}} 
                          name="name" required
                   />
                </div>
              <div className="mb-3">
                <label  htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={email} 
                onChange={(e)=>{setemail(e.target.value)}}
                id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required/>
              </div>
              <div className="mb-3">
                <label  htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} 
                onChange={(e)=>{setpassword(e.target.value)}}
                id="exampleInputPassword1" name="password" required/>
              </div>
              <button type="submit"  className="btn btn-primary">Register</button>
          </form>
        </div>
      </>
    )
}

export default Register
