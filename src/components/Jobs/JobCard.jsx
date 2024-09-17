import React, { useCallback, useEffect,useState } from 'react'
import {NavLink} from 'react-router-dom'
import { useGlobalContext } from '../../context'

const JobCard = ({searchJobs,category}) => {
  const{allJobs,getAJob} = useGlobalContext()

  if(allJobs && searchJobs){
    const filteredJobs = allJobs.filter((e)=>{
      return e.job_title.toLowerCase().includes(searchJobs.toLowerCase())
    })
  
    // console.log(categoryJobs)
    return(
      <div className="jobs-sec">
      {filteredJobs &&
      filteredJobs.map((job)=>{
        return(
          <NavLink onClick={()=>{getAJob(`http://localhost:8000/api/jobs/${job.id}`)}} className='job-card' to={`/jobs/${job.id}`} key={job.id}>
            <div>
            <h6><span>Job Title: </span>{job.job_title}</h6>
            <p><span>Posted By: </span>{job.created_by}</p>
            <p><span>Category: </span>{job.category}</p>
            <p className='min-text'><span>Description: </span>{job.job_description}</p>
            <p><span>Last Date: </span>{job.expire_on}</p>
            <p><span>Posted On: </span>{job.created_on}</p>

          </div>
          </NavLink>
        )
      })}
      </div>
      
    )
  }else if(category && category){
    const categoryJobs = allJobs.filter((e)=>{
      return e.category.toLowerCase().includes(category.toLowerCase())
    })
    return(
      <div>
        {
        
          categoryJobs.map((job)=>{
            return(
              <NavLink onClick={()=>{getAJob(`http://localhost:8000/api/jobs/${job.id}`)}} className='job-card' to={`/jobs/${job.id}`} key={job.id}>
                <div>
                    <h6><span>Job Title: </span>{job.job_title}</h6>
                    <p><span>Posted By: </span>{job.created_by}</p>
                    <p><span>Category: </span>{job.category}</p>
                    <p className='min-text'><span>Description: </span>{job.job_description}</p>
                    <p><span>Last Date: </span>{job.expire_on}</p>
                    <p><span>Posted On: </span>{job.created_on}</p>
        
              </div>
              </NavLink>
            )
          })
        }      
      </div>
    )
  
    
    
  }
  else{
    return(
      <div className='jobs-sec'>
    {allJobs &&
    allJobs.map((job)=>{
    return(
      <NavLink onClick={()=>{getAJob(`http://localhost:8000/api/jobs/${job.id}`)}} className='job-card' to={`/jobs/${job.id}`} key={job.id}>
        <div>
            <h6><span>Job Title: </span>{job.job_title}</h6>
            <p><span>Posted By: </span>{job.created_by}</p>
            <p><span>Category: </span>{job.category}</p>
            <p className='min-text'><span>Description: </span>{job.job_description}</p>
            <p><span>Last Date: </span>{job.expire_on}</p>
            <p><span>Posted On: </span>{job.created_on}</p>

      </div>
      </NavLink>
    )
  })}
  </div>
)
  }
}
// }

export default JobCard