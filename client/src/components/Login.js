import React,{useState,useRef} from 'react'
import {NavLink,useHistory } from 'react-router-dom'
import { baseUrl } from '../Baseurl';

const Login = ({setuserLoggedin}) => {

  const history=useHistory();
 
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
 
  const messageRef = useRef(null);

  
  const submitForm=async(e)=>{
    e.preventDefault();
    
    const res=await fetch(baseUrl+'/login', {

      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
          },
      body:JSON.stringify({
        email,
        password
      }),
     credentials:'include'

    });

   const data= await res.json();
    messageRef.current.innerHTML=data.message;

    
    
      if((res.status===200))
        {
          setuserLoggedin(data.user);
          history.push('/');
        }
      else
      {
        setTimeout(() => {
          messageRef.current.innerHTML='';
          setemail('');
          setpassword('');
        }, 2000)
      }
     

  }

    return (
        <>
            <div className="container-sm" style={{maxWidth:"60%"}}>
    <form method="POST" onSubmit={submitForm}>
    < div class="mb-3" ref={messageRef} style={{color: "red"}}> </div>
       
        
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setpassword(e.target.value)} id="exampleInputPassword1" name="password" required/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
         <NavLink to="/register"> <span className="px-5">Dont have an account?</span> </NavLink>
      </form>
    </div>
        </>
    )
}

export default Login
