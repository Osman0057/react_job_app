import React,{useState}  from 'react'
import CreateProfile from './CreateProfile';
import DisplayProfile from './DisplayProfile';
import UserCreatedJobs from './UserCreatedJobs';
import { useGlobalContext } from '../../context';


const Profile = () => {
  const {showHideModal,updatingModal,profile} = useGlobalContext()
  const [updateProfileModal,setUpdateProfileModal] = useState(false)
  return (
    <section>
      {profile&&
      <div>
        <button onClick={()=>{
          updatingModal(true)
        }}>Update Profile</button>
      </div>
      }
      {!profile&&
      <div>
      <button onClick={()=>{
        showHideModal(true)
      }}>Create Profile</button>
    </div>
    }
      {/* <DisplayProfile/> */}
      <UserCreatedJobs/>
      <CreateProfile updateProfileModal={updateProfileModal}/>
    </section>
  )
}

export default Profile;