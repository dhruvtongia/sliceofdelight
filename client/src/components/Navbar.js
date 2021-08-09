import React from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { baseUrl } from '../Baseurl';

const Navbar = ({cartCounter,userLoggedin,setuserLoggedin}) => {

    const history=useHistory();
   const logout=()=>{

        fetch(baseUrl+'/logout',{

            method:'post',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
      
            setuserLoggedin(null);
            history.push('/');

        })
   }
    return (
        <>
            <nav className="navbar navbar-collapse navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Slice of Delight</NavLink>

                    <ul className="nav ml-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                        { (!userLoggedin)?(
                        <>
                            
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>):
                        (
                            userLoggedin.role==='admin'?(
                                <>
                            <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/admin">Dashboard</NavLink>
                        </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/addmenu">Add Menu</NavLink>
                            </li>
                            <li className="nav-item">
                            <button className="nav-link bg-light"  style={{border:'none'}} onClick={logout} >Logout</button>
                            </li>
                            </>
                            ):(<li className="nav-item">
                            <button className="nav-link bg-light"  style={{border:'none'}} onClick={logout} >Logout</button>
                            </li>)   
                        )
                        
                        }   
                        <li class="nav-item">
                            <NavLink className="nav-link" to="/cart" tabindex="-1" aria-disabled="true"> 
                                <span id="cartcounter">{cartCounter}</span>
                                <img src="/img/cart-black.png" alt="cartimage" /> 
                            </NavLink>
                        </li>
                    </ul>
                    
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar
