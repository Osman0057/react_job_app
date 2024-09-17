import React from 'react'
import { Navigate ,Route} from 'react-router-dom'
import { useGlobalContext } from '../../context'



const PrivateRoute = ({Component}) => {
        const {isLogin} = useGlobalContext()
        console.log(isLogin)

        return(
                isLogin? <Component/>:<Navigate to='/login' />
        )

  
}

export default PrivateRoute