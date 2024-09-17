import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Index from './components/Index'
import Jobs from './components/Jobs/Jobs'
import Header from './components/Header'
import Profile from './components/Profile/Profile';
import Test from './components/Test'
import { GlobalContextProvider, useGlobalContext } from './context'
import JobDetails from './components/Jobs/JobDetails'
import Login from './components/accounts/Login'
import Register from './components/accounts/Register'
import Application from './components/Application'
import PrivateRoute from './components/utils/PrivateRoute'

function App() {


  return (
    
    <GlobalContextProvider>
     <BrowserRouter>
      <Header/>
       <Routes>
        <Route path='/' exact element={<Index/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:jobId' element={<JobDetails/>} />
        <Route path='/profile' element={<PrivateRoute Component={Profile}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/apply/:jobId/:userId' element={<PrivateRoute Component={Application}/>}/>
        <Route path='/test' element={<PrivateRoute Component={Test}/>} />
       </Routes>
     </BrowserRouter>
      
      
    </GlobalContextProvider>
  )
}

export default App
