import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
      email:'',
      password:''
  })
  const [error,setError] = useState(null)
  axios.defaults.withCredentials = true
  const handleSubmit = (event)=>{
      event.preventDefault()
      axios.post('http://localhost:5000/employee/employee_login',values)
      .then(result =>{
        if(result.status === 200){
          navigate('/employee_details/'+result.data.id)
        }else{
          console.log(result)
        }
      })
      .catch(err => setError(err.response.data.error))
  }
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100  loginPage'>
    <div className='p-3 rounded  w-25 border loginForm'>
      <div className='text-danger d-flex justify-content-center py-2'>
        {error && error}
      </div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
          <div className='mb-3'>
              <label htmlFor="email">Email:</label>
              <input type="email" name='email' autoComplete='off' placeholder='Enter email here' onChange={(e)=>setValues({...values,email:e.target.value})} className='form-control rounded-0'/>
          </div>
          <div className='mb-3'>
              <label htmlFor="password">Password:</label>
              <input type="password" name='password' onChange={(e)=>setValues({...values,password:e.target.value})} placeholder='Enter Password' className='form-control rounded-0'/>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
          <div className='mb-1'>
              <input type="checkbox" name='tick' id='tick' className='me-2'/>
              <label htmlFor="password"><strong>Agree with terms & conditions<i className="fa fa-american-sign-language-interpreting ps-2" aria-hidden="true"></i></strong></label>
          </div>
          <div>
              <Link to='/register' className='text-decoration-none text-white d-flex justify-content-end '><label className='link-danger' style={{cursor: 'pointer'}}>Register?</label></Link>
          </div>
      </form>
    </div>
  </div>
  )
}

export default EmployeeLogin
