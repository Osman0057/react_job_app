import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {useGlobalContext} from '../../context'

const JobDetails = () => {
  const{job,getAJob} = useGlobalContext()
  const params = useParams()
  const JOB_URL = `http://localhost:8000/api/jobs/${params.jobId}`

  useEffect(()=>{
    getAJob(JOB_URL)
  },[])
  

  
  
  if(job){
    return (
      <div className='container'>
        <form>
          <div>
            <h5><span>Job Title: </span>{job.job_title}</h5>
          </div>
          <div>
            <p><span>Created By: </span>{job.created_by}</p>
          </div>
          <div>
            <p><span>Category: </span>{job.category}</p>
          </div>
          <div>
            <p><span>Job Description: </span>{job.job_description}</p>
          </div>
          <div>
            <p><span>Last Date: </span>{job.expire_on}</p>
          </div>
          <div>
            <p><span>Posted On: </span>{job.created_on}</p>
          </div>
          <NavLink to = {`/apply/${job.id}/${1}`} >
            <button type='button'>Proceed To Apply</button>
          </NavLink>
        </form>
      </div>
    )
  }else{
    return(
      <h1>No Job Found </h1>
    )
  }
}

export default JobDetails;