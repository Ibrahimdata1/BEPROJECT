import axios from 'axios'
import { useState } from 'react'


const useRefreshToken = ()=>{
  const [tokenState ,setTokenState] = useState()
  const refresh = async()=>{
    const res = await axios.get('/refresh',{
      withCredentials:true
    })
  }
}