import React, { useEffect ,useState} from 'react'
import { useGlobalContext } from '../../context'

const DisplayProfile = () => {
        const USER_PROFILE = `http://localhost:8000/api/profile/${1}`
        const {profile,GetUserProfile} = useGlobalContext()
        const {updatingData,deletinData,updatingModal,updateModal,setUpdateModal} = useGlobalContext()
        const [profileData,setProfileData] = useState({
                user:1,
                first_name:profile&&profile.first_name,
                last_name:profile&&profile.last_name,
                email:profile&&profile.email,
                date_of_birth:profile&&profile.date_of_birth,
                cnic_number:profile&&profile.cnic_number,
                resume:profile&&profile.resume

        })
        const[wantToDelete,setWantToDelete] = useState(false)

        const config = {
                method:'POST',
                headers:{
                        'Content-Type':'multipart/form-data'
                },
                body:profileData.json
        }


        useEffect(()=>{
                GetUserProfile(USER_PROFILE)
        },[])
        
        
  return (
        <>
        {profile&&
                <form method='POST'>

        <div className='form-input'>
                <label htmlFor="first_name">First Name:</label>
                <input id='first_name' value={profile&&profile.first_name} disabled type="text" placeholder='John' />
        </div>

        <div className='form-input'>
                <label htmlFor="last_name">Last Name:</label>
                <input id='last_name' value={profile&&profile.last_name} disabled type="text" placeholder='Doe' />
        </div>

        <div className='form-input'>
                <label htmlFor="email">Email:</label>
                <input id='email'value={profile&&profile.email} disabled type="email" placeholder='john007@gmail.com' />
        </div>

        <div className='form-input'>
                <label htmlFor="date_of_birth">Date Of Birth:</label>
                <input id='date_of_birth' value={profile&&profile.date_of_birth} disabled type="date" placeholder='30/08/2024' />
        </div>

        <div className='form-input'>
                <label htmlFor="cnic_number">CNIC Number:</label>
                <input id='cnic_number'value={profile&&profile.cnic_number} disabled type="number" placeholder='01234567890123' />
        </div>

        <div className='form-input'>
                <label htmlFor="resume">Resume:</label>
                <input  id='resume' disabled type="file"  />
        </div>

        <div className='form-btn'>
                <button onClick={()=>{updatingModal(true)}} className='btn-primary' type='button'>Update Profile</button>
                <button onClick={()=>{profile&&setWantToDelete(true)}} className='btn-delete' type='button'>Delete Profile</button>
        </div>

    </form>}


    {/* CREATING MODAL FOR UPDATING PROFILE */}

    <div className='modal-form' style={{'display':updateModal?'block':'none'}}>
    <form method='PUT' onSubmit={(e)=>{
        e.preventDefault()
        updatingData(USER_PROFILE,profileData,config)
        setProfileData({
                user:1,
                first_name:'',
                last_name:'',
                email:'',
                date_of_birth:'',
                cnic_number:'',
                resume:''
``
        })
        setUpdateModal(false)
    }}>
         <span onClick={()=>{updatingModal(false)}} className='close-btn'>Close</span>

        <div className='form-input'>
                <label htmlFor="first_name">First Name:</label>
                <input onChange={(e)=>{setProfileData({...profileData,first_name:e.target.value})}} value={profileData.first_name} id='first_name' type="text"/>
        </div>

        <div className='form-input'>
                <label htmlFor="last_name">Last Name:</label>
                <input onChange={(e)=>{setProfileData({...profileData,last_name:e.target.value})}} value={profileData.last_name} id='last_name' type="text"/>
        </div>

        <div className='form-input'>
                <label htmlFor="email">Email:</label>
                <input onChange={(e)=>{setProfileData({...profileData,email:e.target.value})}} value={profileData.email} id='email' type="email"/>
        </div>

        <div className='form-input'>
                <label htmlFor="date_of_birth">Date Of Birth:</label>
                <input onChange={(e)=>{setProfileData({...profileData,date_of_birth:e.target.value})}} value={profileData.date_of_birth} id='date_of_birth' type="date"/>
        </div>

        <div className='form-input'>
                <label htmlFor="cnic_number">CNIC Number:</label>
                <input onChange={(e)=>{setProfileData({...profileData,cnic_number:e.target.value})}} value={profileData.cnic_number} id='cnic_number' type="number"/>
        </div>

        <div className='form-input'>
                <label htmlFor="resume">Resume:</label>
                <input onChange={(e)=>{setProfileData({...profileData,resume:e.target.files[0]})}} filename={profileData.resume} id='resume' type="file"/>
        </div>

        <div className='form-input'>
                <button type='submit'>Update Profile</button>
        </div>

    </form>
    </div>

    {/* WANT TO DELETE MODAL */}
    <div className='min-modal' style={{'display':wantToDelete?'flex':'none'}}>
        <form method='DELETE' onSubmit={(e)=>{
                e.preventDefault()
                deletinData(USER_PROFILE)
        }}>
                <h6>Do you want to delete it?</h6>
                <button type='submit'>Yes</button>
                <button onClick={()=>{setWantToDelete(false)}} className='btn-delete'>No</button>
        </form>
    </div>
        </>
  )
}

export default DisplayProfile