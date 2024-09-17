
import axios from "axios";
import {redirect} from 'react-router-dom'

const RefreshToken = async ()=>{
        // const navigate = useNavigate()
        const REFRESH_URL = `http://localhost:8000/api/token/refresh/`;
        const refreshToken = {
                refresh:localStorage.getItem('refresh')
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
                if(response.status===200){
                        localStorage.clear()
                        console.log('REFRESHTOKEN HIT')
                        localStorage.setItem('access',response.data.access)
                        localStorage.setItem('access',response.data.refresh)
                }else if(response.data.status===401){
                        console.log('###########')
                }
               
        }catch(error){
                console.log(error.message)
        }
}

export default RefreshToken;