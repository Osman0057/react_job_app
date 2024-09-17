import {createContext,useCallback,useContext, useEffect, useState} from 'react'
import axios, { all } from 'axios'
import { redirect } from 'react-router-dom'
// import RefreshToken from '../utils/RefreshToken'


const GlobalContext = createContext()


const GlobalContextProvider=({children})=>{
        const ALL_JOBS_URL = 'http://localhost:8000/api/jobs'
        const USER_PROFILE = `http://localhost:8000/api/profile/${1}`
        const USER_CREATED_JOBS_URL = `http://localhost:8000/api/profile/1/jobs`
        
        const [access,setAccess] = useState(localStorage.getItem('access')?localStorage.getItem('access'):null)
        const [refresh,setRefresh] = useState(localStorage.getItem('refresh')?localStorage.getItem('refresh'):null)
        const [user,setUser] = useState()
        

        const [showModal,setShowModal] = useState(false)
        const [updateModal,setUpdateModal] = useState(false)
        const [allJobs,setAllJobs] = useState()
        const [job,setJob] = useState()
        const [searchJobs,setSearchJobs] = useState()
        const [successMessage,setSuccessMessage] = useState()
        const [errorMessage,setErrorMessage] = useState()
        const [profile,setProfile] = useState()
        const [categories,setCategories] = useState([])
        const [userCreatedJobs,setUserCreatedJobs] = useState()
        const [isLogout,setIsLogout] = useState(false)
        const [isLogin,setIsLogin] = useState(localStorage.getItem('access')?true:false)
        // const categories = []

// SHOW AND HIDE MODAL
        const showHideModal=(showOrHide)=>{
                setShowModal(showOrHide)
        }
        const updatingModal = (showOrHide)=>{
                setUpdateModal(showOrHide)
        }

        const RefreshToken = async()=>{

                const REFRESH_URL = `http://localhost:8000/api/token/refresh/`;
        const refreshToken = {
                refresh:refresh
        }
        const config = {
                method:'POST',
                headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                },
                body:refreshToken.json
        }
        

                try{
                        const response = await axios.post(REFRESH_URL,refreshToken,config)
                        if(response.status === 200){
                                console.log('REFRESHTOKEN HIT')
                                console.log(response.data)
                                localStorage.setItem('access',response.data.access)
                        }else if(response.status === 401){
                                console.log('###########')
                        }else{
                                console.log("#############else statement")
                        }
                       
                }catch(error){
                        console.log(error.message)
                        redirect('/login')
                }

        
                
}

// GETTING LOGGED IN 
        const getLoggedIn = async (url,data,config)=>{
                try{
                        const response = await axios.post(url,data,config)
                        if(response.status===200){
                                localStorage.setItem('access',response.data.access)
                                localStorage.setItem('refresh',response.data.refresh)
                                setIsLogin(true)
                                setIsLogout(false)
                                
                        }
                }catch(error){
                        setErrorMessage(error.message)
                }

        }
        const getLoggedOut = async(url,data,config)=>{
                const response =  await axios.post(url,data,config)
                if(response.status===200){
                        setIsLogin(false)
                        setIsLogout(true)
                }
        }


// GETTING ALL JOB FROM API
        const  getAllJobs = async(url) => {
                try{
                        const response = await axios.get(ALL_JOBS_URL)
                        setAllJobs(response.data)
                        setSuccessMessage(response.message)
                }catch(error){
                        setErrorMessage(error)
                }
                
        }
        // GETING USER CREATED JOBS 
        const getUserCreatedJobs = async (url)=>{
                try{
                        const response = await axios.get(url)
                        setUserCreatedJobs(response.data)
                        setSuccessMessage(response.data.message)
                }catch(error){
                        setErrorMessage(error.message)
                }
        }

        // CREATING FUNCTION FOR POSTING AND UPDATING JOBS
        const creatingNewData=async(url,data,config)=>{
                const response = await axios.post(url,data,config)
                if(response.status === 200){
                        setSuccessMessage(response.data.message)
                }
        }
        // Creating Updating DAta Function
        const updatingData = async (url,data,config)=>{
                try{
                        const response = await axios.put(url,data,config)
                        setSuccessMessage(response.data.message)
                        console.log(response.data)
                }catch(error){
                        setErrorMessage(error.message)
                }
        }

        // DELETING DATA FUNCTION
        const deletinData = async (url)=>{
                try{
                        const response = await axios.delete(url)
                        setSuccessMessage(response.data.message)
                }catch(error){
                        setErrorMessage(error.message)
                }
        }

        // GETTING A SINGLE JOB RECORD
        const getAJob=async(url)=>{
                try{
                        const response = await axios.get(url)
                        setJob(response.data)
                        setSuccessMessage(response.data.message)
                }catch(error){
                        setErrorMessage(error.message)
                }
        }
        //  GETTING SINGLE USER PROFILE
        const GetUserProfile = async (url)=>{
                try{
                        if(isLogin && !profile){
                                const response = await axios.get(url)
                                setProfile(response.data)
                                setSuccessMessage(response.message)
                        }else{
                                redirect('/login')
                        }
                }catch(error){
                        setErrorMessage(error)
                }
        }

        const getCategories = async ()=>{
                 if(allJobs){
                        return (
                                await allJobs.map((cat)=>{
                                        return categories.push(cat.category)
                                })
                        )
                 }
                 
        }
        getCategories()
        const allCategories = new Set(categories)
        const uniqueCategories = [...allCategories]
      
        



        
        // REFLECTING CHANGES USING USE_EFFECT
        useEffect(()=>{
                getAllJobs(ALL_JOBS_URL)
                
                if(isLogin && !profile){
                        GetUserProfile(USER_PROFILE)
                }
                
                getUserCreatedJobs(USER_CREATED_JOBS_URL)
                
                
                
        },[])
        
        setInterval(()=>{
                if(refresh){
                        RefreshToken()
                }else{
                        redirect('/login')
                }
        },1000*60*5)
        
        

        return(
                <GlobalContext.Provider value={{profile,isLogin,getLoggedIn,isLogin,setIsLogin,getAllJobs,userCreatedJobs,uniqueCategories,successMessage,errorMessage,getAJob,job,profile,searchJobs,allJobs,showModal,updateModal,setUpdateModal,showHideModal,updatingModal,creatingNewData,updatingData,deletinData,GetUserProfile}}>
                  {children}
                </GlobalContext.Provider>
        )
}


const useGlobalContext = ()=>{
        return useContext(GlobalContext)
}
export {GlobalContext,GlobalContextProvider,useGlobalContext}