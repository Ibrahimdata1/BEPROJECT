import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const EmployeeDetails = () => {
    const {id} = useParams()
    useEffect(()=>{
        axios.get('http://localhost:5000/employee/'+id)
        .then(result=>{
            console.log(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
  return (
    <div>
      EmployeeDetails
    </div>
  )
}

export default EmployeeDetails
