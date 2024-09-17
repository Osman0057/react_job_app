import React, { useState } from 'react'
import { useGlobalContext } from '../../context'

const CreateJobForm = () => {
        const JOB_API_URL = 'http://localhost:8000/api/jobs'

        const{ showModal,showHideModal,creatingNewData} = useGlobalContext()
        const [jobData,setJobData] = useState({
                created_by:1,
                job_title:'',
                category:'',
                job_description:'',
                expire_on:'',
                created_on:'',

        })
        
        const config = {
                method:'POST',
                headers:{
                        'Content-Type':'application/json'
                },
                body:jobData.json
        }
        
  return (
    <div className='modal-form' style={{'display':showModal?'block':'none'}}>
    <form method='POST' onSubmit={(e)=>{
        e.preventDefault()
        creatingNewData(JOB_API_URL,jobData,config)
        setJobData({
                created_by:1,
                job_title:'',
                job_description:'',
                expire_on:'',
                created_on:'',

        })
    }}>
        <span onClick={()=>{showHideModal(false)}} className='close-btn'>Close</span>

<div className='form-input'>
        <label htmlFor="job_title">Job Title:</label>
        <input
        onChange={(e)=>{
                setJobData({...jobData,job_title:e.target.value})
        }}
        value={jobData.job_title}
         id='job_title' type="text" placeholder='Laravel Developer' />
</div>

<div className="form-input">
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" onChange={(e)=>{
                setJobData({...jobData,category:e.target.value})
        }}
        value={jobData.category}>
                <option defaultValue="Select Category" disabled>Select Category</option>
                <option value="Education">Education</option>
                <option value="IT and Programming">IT and Programming</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales and Management">Sales and Management</option>
                <option value="Banking">Banking</option>
        </select>
</div>

<div className='form-input'>
        <label htmlFor="job_description">Description:</label>
        <textarea
        onChange={(e)=>{
                setJobData({...jobData,job_description:e.target.value})
        }}
        value={jobData.job_description}
        id='job_description' type="text" placeholder='Doe' rows={8}></textarea>
</div>

<div className='form-input'>
        <label htmlFor="expire_on">Last Date:</label>
        <input
        onChange={(e)=>{
                setJobData({...jobData,expire_on:e.target.value})
        }}
        value={jobData.expire_on}
        id='expire_on' type="date" />
</div>

<div className='form-input'>
        <label htmlFor="created_on">First Name:</label>
        <input
        onChange={(e)=>{
                setJobData({...jobData,created_on:e.target.value})
        }}
        value={jobData.created_on}
        id='created_on' type="date"/>
</div>

<div><button type='submit'>Create Job</button></div>

</form>
    </div>
  )
}

export default CreateJobForm