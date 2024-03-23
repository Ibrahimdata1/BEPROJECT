import React, { useEffect, useState } from 'react'

const Home = () => {
    const [adminTotal,setAdminTotal] = useState()
    const [employeeTotal,setEmployeeTotal] = useState()
    const [salaryTotal,setSalaryTotal] = useState()
    useEffect(()=>{

    },[])
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-2 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Admin</h4>
            </div>
            <hr/>
            <div className=''>
                <h5>Total:</h5>
            </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Employee</h4>
            </div>
            <hr/>
            <div className=''>
                <h5>Total:</h5>
            </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Salary</h4>
            </div>
            <hr/>
            <div className=''>
                <h5>Total:</h5>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
