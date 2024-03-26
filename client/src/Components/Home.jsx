import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [adminRecord, setAdminRecord] = useState([]);
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios
      .get("http://localhost:5000/auth/adminRecords")
      .then((result) => {
        if (result.status === 200) {
          setAdminRecord(result.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const adminCount = () => {
    axios
      .get("http://localhost:5000/auth/adminCount")
      .then((result) => {
        if (result.status === 200) {
          setAdminTotal(result.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const employeeCount = () => {
    axios
      .get("http://localhost:5000/employee/employeeCount")
      .then((result) => {
        if (result.status === 200) {
          setEmployeeTotal(result.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const salaryCount = () => {
    axios
      .get("http://localhost:5000/employee/salaryCount")
      .then((result) => {
        if (result.status === 200) {
          setSalaryTotal(result.data[0].total);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>list of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminRecord.map((data) => (
              <tr key={data._id}>
                <td>{data.email}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
