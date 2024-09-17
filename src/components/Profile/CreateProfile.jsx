import React, { useState } from 'react'
import { useGlobalContext } from '../../context'

const CreateProfile = () => {
        const API_PROFILE_URL = 'http://localhost:8000/api/profile'
        const {creatingUpdatingJob,showHideModal,showModal,profile} = useGlobalContext()
        const [profileData,setProfileData] = useState({
                user:1,
                first_name:'',
                last_name:'',
                email:'',
                date_of_birth:'',
                cnic_number:'',
                resume:''

        })
        const config = {
                method:'POST',
                headers:{
                        'Accept':'multipart/form-data',
                        'Content-Type':'multipart/form-data'
                },
                body:profileData.json
        }
console.log(profile)

  return (
        <div className='modal-form' style={{'display':showModal?'block':'none'}}>
    <form method='POST' onSubmit={(e)=>{
        e.preventDefault()
        creatingUpdatingJob(API_PROFILE_URL,profileData,config)
        setProfileData({
                user:1,
                first_name:'',
                last_name:'',
                email:'',
                date_of_birth:'',
                cnic_number:'',
                resume:''

        })
    }}>
         <span onClick={()=>{showHideModal(false)}} className='close-btn'>Close</span>

        <div className='form-input'>
                <label htmlFor="first_name">First Name:</label>
                <input onChange={(e)=>{setProfileData({...profileData,first_name:e.target.value})}} value={profileData.first_name} id='first_name' type="text" placeholder='John' />
        </div>

        <div className='form-input'>
                <label htmlFor="last_name">Last Name:</label>
                <input onChange={(e)=>{setProfileData({...profileData,last_name:e.target.value})}} value={profileData.last_name} id='last_name' type="text" placeholder='Doe' />
        </div>

        <div className='form-input'>
                <label htmlFor="email">Email:</label>
                <input onChange={(e)=>{setProfileData({...profileData,email:e.target.value})}} value={profileData.email} id='email' type="email" placeholder='john007@gmail.com' />
        </div>

        <div className='form-input'>
                <label htmlFor="date_of_birth">Date Of Birth:</label>
                <input onChange={(e)=>{setProfileData({...profileData,date_of_birth:e.target.value})}} value={profileData.date_of_birth} id='date_of_birth' type="date" placeholder='30/08/2024' />
        </div>

        <div className='form-input'>
                <label htmlFor="cnic_number">CNIC Number:</label>
                <input onChange={(e)=>{setProfileData({...profileData,cnic_number:e.target.value})}} value={profileData.cnic_number} id='cnic_number' type="number" placeholder='01234567890123' />
        </div>

        <div className='form-input'>
                <label htmlFor="resume">Resume:</label>
                <input onChange={(e)=>{setProfileData({...profileData,resume:e.target.files[0]})}} filename={profileData.resume} id='resume' type="file"  />
        </div>

        <div className='form-input'>
                <button type='submit'>Create Profile</button>
        </div>

    </form>
    </div>

  )
}

export default CreateProfile