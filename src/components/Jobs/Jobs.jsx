import React, { useState ,useEffect} from 'react'
import JobCard from './JobCard'
import CreateJobForm from './CreateJobForm'
import { useGlobalContext } from '../../context'
import { ImCross } from 'react-icons/im'
// ImGoogleDrive

const Jobs = () => {
  const {uniqueCategories} = useGlobalContext()
  const [searchWord,setSearchWord] = useState()
  const [category,setCategory] = useState()
  const[company,setCompany] = useState()

  
  return (
    <section>
      <div className='search-bar'>
        <input className='search-input' name='searchWord' onChange={(e)=>{setSearchWord(e.target.value)}} value={searchWord} type='search' placeholder='Laravel Developer'/>
        <button className='search-btn'>Search</button>
      </div> 
      <div>
        <button className='btn-clear' style={{'display':category?'inline-block':'none'}} onClick={()=>{setCategory(null)}}><span><ImCross color='red' size='1em'/></span>Clear Filter</button>
        <select onChange={(e)=>{
          setCategory(e.target.value)
        }} name="category" id="category">
          <option defaultValue='Select a category' disabled>Select a category</option>
          {uniqueCategories.map((x)=>{
          return(
            <option value={x} key={x}>{x}</option>
          )
        })
      }
        </select>

        <select onChange={(e)=>{
          setCompany(e.target.value)
        }} name="company" id="company">
          <option defaultValue disabled>By Company</option>
          <option value="company_1">Compny 1</option>
          <option value="company_2">Compny 2</option>
          <option value="company_3">Compny 3</option>
          <option value="company_4">Compny 4</option>
          <option value="company_5">Compny 5</option>
          <option value="company_6">Compny 6</option>
        </select>
      </div>
      <JobCard searchJobs={searchWord} category={category&&category} />
      <CreateJobForm />
    </section>
  )
}

export default Jobs