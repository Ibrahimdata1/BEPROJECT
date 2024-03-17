import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddCategory = () => {
    const navigate = useNavigate()
    const [category,setCategory] = useState({
        categoryName:''
    })
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:5000/category/add_category',category)
        .then(result =>{
            if(result.status === 200){
                navigate('/dashboard/category')
            }
        })
        .catch(err => {
            navigate('/adminlogin')
            console.log(err)
        })
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded  w-25 border border-2'>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
          <div className='mb-3'>
              <label htmlFor="category"><strong>Category:</strong></label>
              <input type="text" name='categoryName' placeholder='Enter Category here' onChange={(e)=>setCategory({categoryName:e.target.value})} className='form-control rounded-0'/>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
      </form>
    </div>
  </div>
  )
}

export default AddCategory
