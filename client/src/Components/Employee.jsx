import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:5000/employee/").then((result) => {
      if (result.status === 200) {
        setEmployee(result.data);
      }
    });
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/employee/delete_employee/" + id)
      .then((result) => {
        if (result.status === 200) {
            window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>employeeName</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((data) => (
              <tr key={data._id}>
                <td>{data.employeName}</td>
                <td>
                  <img
                    src={`http://localhost:5000/Images/` + data.image}
                    className="employee_image"
                  />
                </td>
                <td>{data.email}</td>
                <td>{data.address}</td>
                <td>{data.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + data._id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
