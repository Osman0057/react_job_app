import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {RiAddBoxLine } from 'react-icons/ri';
import { useGlobalContext } from '../context';
import { ImCross } from 'react-icons/im'
import { FaBars  } from 'react-icons/fa';
import { redirect } from 'react-router-dom';
import ProtectedRoutes from './utils/PrivateRoute'





const Header = () => {
  const {showHideModal,isLogin} = useGlobalContext()
  const [navClass,setNavClass] = useState('hideNav')
 
  
  return (
    <header style={{}}>
        <NavLink to='/'><h1 className='logo'><span className='dot-logo'>i</span>Job</h1></NavLink>
        <nav className={navClass&&navClass}>
        <ul>
          <li><NavLink to='/' className='nav-links'>Home</NavLink></li>
          <li><NavLink to='/jobs' className='nav-links'>Jobs</NavLink></li>
          <li><NavLink to='/apply-now' className='nav-links'>Apply Job</NavLink></li>
          <li><NavLink to='/about' className='nav-links'>About</NavLink></li>
          <li><NavLink to='/contact-us' className='nav-links'>Contact Us</NavLink></li>
        </ul>
        <ul>
          <li><NavLink to='/register' className='profile-links'>Register</NavLink></li>
          {!isLogin?
          <li><NavLink to='/login' className='profile-links'>Login</NavLink></li>
          :
          <li><NavLink to='/logout' className='profile-links'>Logout</NavLink></li>
          }
          {isLogin?
        <li><NavLink  onClick={()=>{showHideModal(true)}}  to= '/profile' className='profile-links'>Profile</NavLink></li>
        :
        null  
        }
        {isLogin&&
         <li><NavLink onClick={()=>{showHideModal(true)}} to='/jobs' className='profile-links'>Create Job</NavLink></li>
        }
        </ul>
        </nav>
        <div className='show-hide-nav'>
          <span style={{'display':navClass.includes('showNav')?'block':'none'}} onClick={()=>{setNavClass('hideNav')}}><ImCross color='white'/></span>
          <span style={{'display':navClass.includes('hideNav')?'block':'none'}} onClick={()=>{setNavClass('showNav')}}><FaBars color='white'/></span>
        </div>
        
    </header>
  )
}

export default Header