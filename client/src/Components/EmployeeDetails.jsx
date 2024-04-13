import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'

const EmployeeDetails = () => {
    const [employee,setEmployee] = useState([])
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const {id} = useParams()
    useEffect(()=>{
        axios.get('http://localhost:5000/employee/'+id)
        .then(result=>{
            setEmployee(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    const handleLogout = () => {
        axios.get('http://localhost:5000/employee/logout')
        .then(result => {
          if(result.status === 200) {
            localStorage.removeItem('valid')
            navigate('/')
            window.location.reload()
          }
        }).catch(err => console.log(err))
      }
  return (
    <div>
    <div className="p-2 d-flex justify-content-center shadow mb-5">
        <h4>Emoployee Management System</h4>
    </div>
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`http://localhost:5000/Images/${employee.image}`} className='emp_det_image'/>
        <div className='d-flex align-items-center flex-column mt-5 mb-4'>
            <h3>Name: {employee.employeName}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Address: {employee.address}</h3>
            <h3>Salary: ฿{employee.salary}</h3>
        </div>
        <div>
            <button className='btn btn-primary me-2'>Edit</button>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    </div>
</div>
  )
}

export default EmployeeDetails
