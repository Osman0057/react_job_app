import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context'

const Application = () => {
        const navigate = useNavigate()
        const params = useParams()
        const {isLogin,profile,job,GetUserProfile,getAJob,creatingNewData} = useGlobalContext()
        const PROFILE_URL = `http://localhost:8000/api/profile/${params.userID}`
        const JOB_URL = `http://localhost:8000/api/jobs/${params.jobId}`
        const APPLICATION_URL = `http://localhost:8000/api/application/${params.jobId}/${params.userId}`
        const[application,setApplication] = useState({
                user:params.userId,
                job:params.jobId
        })
        const config = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json'
                },
                body:application.json
        }
        useEffect(()=>{
                GetUserProfile(PROFILE_URL)
                getAJob(JOB_URL)
                

        },[])
        
  return (
    <section>
        <form onSubmit={(e)=>{
                e.preventDefault()
                creatingNewData(APPLICATION_URL,application,config)
                navigate('/jobs')
        }}>
                <div className="form-input">
                        <label htmlFor="first_name">First Name: </label>
                        <input disabled value={profile&&profile.first_name} type="text" />
                </div>

                <div className="form-input">
                        <label htmlFor="last_name">Last Name: </label>
                        <input disabled value={profile&&profile.last_name} type="text" />
                </div>

                <div className="form-input">
                        <label htmlFor="email">Email: </label>
                        <input disabled value={profile&&profile.email} type="email" />
                </div>

                <div className="form-input">
                        <label htmlFor="date_of_birth">Date Of Birth: </label>
                        <input disabled value={profile&&profile.date_of_birth} type="date" />
                </div>

                <div className="form-input">
                        <label htmlFor="cnic_number">CNIC Number: </label>
                        <input disabled value={profile&&profile.cnic_number} type="number" />
                </div>

                <div className="form-input">
                        <label htmlFor="resume">Resume: </label>
                        <input disabled filename={profile&&profile.resume} type="file" />
                </div>
               {
                isLogin&&
                <div className="form-input">
                   <button type='submit'>Apply Now</button>
                </div>
               }
        </form>
        
    </section>
  )
}

export default Application;