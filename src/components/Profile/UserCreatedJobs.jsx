import React, { useEffect ,useState} from 'react'
import { useGlobalContext } from '../../context'
import {FaTrash ,FaEdit} from 'react-icons/fa'

const UserCreatedJobs = () => {
        const USER_CREATED_JOBS_URL = `http://localhost:8000/api/profile/1/jobs`
        const ALL_JOBS_URL = 'http://localhost:8000/api/jobs'
        const {getAllJobs,deletinData,setUpdateModal,updatingData,userCreatedJobs,updateModal,updatingModal,getAJob,job} = useGlobalContext()
        const [updateUrl,setUpdateUrl] = useState()
        const [wantToDelete,setWantToDelete] = useState(false)
        const [deleteJobUrl,setDeleteJobUrl] = useState()
        
        const [jobData,setJobData] = useState({
                created_by:1,
                job_title:job&&job.job_title,
                category:job&&job.category,
                job_description:job&&job.job_description,
                expire_on:job&&job.expire_on,
                created_on:job&&job.created_on

        })
        
        const config = {
                method:'PUT',
                headers:{
                        'Content-Type':'application/json'
                },
                body:jobData.json
        }


  return (
    <>
    <section>
        {userCreatedJobs?
        
        <table border={0} cellSpacing={0}>
                <thead>
                <tr>
                        <th>Job Title</th>
                        <th>Created On</th>
                        <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {userCreatedJobs.map((e)=>{
                return(
                <tr key={e.id}>
                        <td>{e.job_title}</td>
                        <td>{e.created_on}</td>
                        <td>
                                <span onClick={()=>{
                                        updatingModal(true)
                                        setUpdateUrl(`http://localhost:8000/api/jobs/${e.id}`)
                                        getAJob(`http://localhost:8000/api/jobs/${e.id}`)
                                        }} className='action-btn'><FaEdit color='green' fontSize={14}/></span>
                                <span onClick={()=>{
                                        setDeleteJobUrl(`http://localhost:8000/api/jobs/${e.id}`)
                                        setWantToDelete(true)}
                                        } className='action-btn'><FaTrash color='red' fontSize={14}/></span>
                        </td>
                </tr>
                        )
})}
                </tbody>

        </table>

        :
        <span className='message-page'>No Job Find!</span>
}
    </section>
    <section>

        {/* MODAL SECTION */}
        <section>
    <div className='modal-form' style={{'display':updateModal?'block':'none'}}>
    <form method='PUT' onSubmit={(e)=>{
        e.preventDefault()
        updatingData(updateUrl,jobData,config)
        setUpdateModal(false)
        setJobData({
                created_by:1,
                job_title:'',
                job_description:'',
                expire_on:'',
                created_on:'',

        })
        getAllJobs(ALL_JOBS_URL)
    }}>
        <span onClick={()=>{updatingModal(false)}} className='close-btn'>Close</span>

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
        <label htmlFor="created_on">Created On:</label>
        <input
        onChange={(e)=>{
                setJobData({...jobData,created_on:e.target.value})
        }}
        value={jobData.created_on}
        id='created_on' type="date"/>
</div>

<div><button type='submit'>Update Job</button></div>

</form>
    </div>
    </section>
    </section>

    {/* DELETING JOB RECORD  */}
    <section>
    <div className='min-modal' style={{'display':wantToDelete?'flex':'none'}}>
        <form method='DELETE' onSubmit={(e)=>{
                e.preventDefault()
                deletinData(deleteJobUrl)
                setWantToDelete(false)
        }}>
                <h6>Do you want to delete it?</h6>
                <button type='submit'>Yes</button>
                <button onClick={()=>{setWantToDelete(false)}} className='btn-delete'>No</button>
        </form>
    </div>
    </section>
    </>
  )
}

export default UserCreatedJobs