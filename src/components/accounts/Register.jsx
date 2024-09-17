import React,{useState} from 'react'
import { useGlobalContext } from '../../context'

const Register = () => {
        const REGISTER_URL = 'http://localhost:8000/api/accounts'
        const{creatingNewData,successMessage} = useGlobalContext()
        const[registerCredential,setRegisterCredential] = useState({
                username:'',
                email:'',
                password:''
        })
        const config = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json'
                },
                body:registerCredential.json
        }

  return (
        <section>
        <form onSubmit={(e)=>{
        e.preventDefault()
        creatingNewData(REGISTER_URL,registerCredential,config)
        setRegisterCredential({
                username:'',
                email:'',
                password:''
        })
    }}>
        <div className='form-input'>
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=>{setRegisterCredential({...registerCredential,username:e.target.value})}} value={registerCredential.username} type="text" id='username' placeholder='john007'/>
        </div>
        <div className='form-input'>
                <label htmlFor="email">Email:</label>
                <input onChange={(e)=>{setRegisterCredential({...registerCredential,email:e.target.value})}} value={registerCredential.email} type="email" id='email' placeholder='john007@gmail.com'/>
        </div>
        <div className='form-input'>
                <label htmlFor="password">Password:</label>
                <input onChange={(e)=>{setRegisterCredential({...registerCredential,password:e.target.value})}} value={registerCredential.password} type="password" id='password' placeholder='********'/>
        </div>
        
        <div className='form-input'>
                <button type="submit">Register Now</button>
        </div>
    </form>
    </section>
  )
}

export default Register