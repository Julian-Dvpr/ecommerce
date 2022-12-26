import React, {useContext, useState} from 'react';
import {GlobalState} from '../../GlobalState';
import  Menu from  './icons/menu.svg';
import  Close from  './icons/close.svg';
import  Cart from  './icons/cart.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true



function Header() {

  const state = useContext(GlobalState)

  const [isLogged] = state.UserAPI.isLogged
  const [isAdmin] = state.UserAPI.isAdmin
  const [cart] = state.UserAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () =>{
      await axios.get("/user/logout")
      localStorage.removeItem("firsLogin")
      window.location.href = "/"
  }

  const adminRouter = () =>{
    return(
      <>
        <li><Link to={"/create_product"} >Create Product</Link></li>
        <li><Link to={"/category"} >Categories</Link></li>
      </>
    )
  }
  const loggedRouter = () =>{
    return(
      <>
        <li><Link to={"/history"} >History</Link></li>
        <li><Link to={"/"} onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

  const toggleMenu = () => setMenu(!menu)


  const styleMenu = {
    left: menu ? 0 : "-100%"
  }



  return (
    <header>
      <div className='menu' onClick={()=>setMenu(!menu)}>
            <img src={Menu} alt="" width="30" />
        </div>
        <div className='logo'>
            <h1>
              <Link to={"/"}>{isAdmin ? "Admin" : "Kitch Art Shop" }</Link>
            </h1>
        </div>
        <ul style={styleMenu}>
          <li><Link to={"/"}>{isAdmin ? "Products": "Shop" }</Link> </li>

          {isAdmin && adminRouter()}
          {
            isLogged ? loggedRouter() : <li><Link to={"/login"}>Login ☺ Register</Link> </li>
          }

          
          <li onClick={()=>setMenu(!menu)}>
            <img src={Close} alt="" width="30" className='menu'/>
          </li>
        </ul>
        

        {
          isAdmin ? "" 
          :<div className='cart-icon'>
          <span>{cart.length} </span>
          <Link to={"/cart"}  ><img src={Cart} alt="" width="30" /> </Link>
          </div>
        }


        
    </header>
  )
}

export default Header;

