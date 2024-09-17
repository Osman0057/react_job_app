import React, { useState } from 'react'
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';


const Login = () => {
        const LOGIN_URL = 'http://localhost:8000/api/login/'

        const {getLoggedIn} = useGlobalContext()
        const navigate = useNavigate()
        const[loginCredential,setLoginCredential] = useState({
                username:'',
                password:''
        })

        const config = {
                method:"POST",
                headers:{
                        "Content-Type":'application/json'
                },
                body:loginCredential.json
        }

  return (
    <section>
        <form onSubmit={(e)=>{
        e.preventDefault()
        getLoggedIn(LOGIN_URL,loginCredential,config)
        setLoginCredential({
                username:'',
                password:''
        })
        navigate('/')
    }}>
        <div className='form-input'>
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=>{setLoginCredential({...loginCredential,username:e.target.value})}} value={loginCredential.username} type="text" id='username' placeholder='john007'/>
        </div>
        <div className='form-input'>
                <label htmlFor="password">Password:</label>
                <input onChange={(e)=>{setLoginCredential({...loginCredential,password:e.target.value})}} value={loginCredential.password} type="password" id='password' placeholder='********'/>
        </div>
        <div className='form-input'>
                <button type="submit">Login Now</button>
        </div>
    </form>
    </section>
  )
}

export default Login