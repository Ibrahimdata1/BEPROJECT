import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {
    const [values,setValues] = useState({
        username:'',
        email:'',
        password:''
    })
    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:5000/auth/register',values)
        .then(result =>console.log(result))
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100  loginPage'>
      <div className='p-3 rounded  w-25 border loginForm'>
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="username">Username:</label>
                <input type="username" name='username' placeholder='Enter username here' onChange={(e)=>setValues({...values,username:e.target.value})} className='form-control rounded-0'/>
            </div>
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
                <Link to='/adminlogin' className='text-decoration-none text-white d-flex justify-content-end '><label className='link-danger' style={{cursor: 'pointer'}}>Login?</label></Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register
