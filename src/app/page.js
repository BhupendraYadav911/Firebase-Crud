"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpListing = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedColumn, setSortedColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Number of employees to display per page

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page after new search
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (employee.active ? "Yes" : "No").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    // ... (existing sorting logic)
  });

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="mt-4">Employee Listing</h2>
      <div className="mb-3 row">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email, Phone, or Active..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => setSortedColumn("id")}>ID</th>
            <th onClick={() => setSortedColumn("name")}>Name</th>
            <th onClick={() => setSortedColumn("email")}>Email</th>
            <th onClick={() => setSortedColumn("phone")}>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.active ? "Yes" : "No"}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination justify-content-center">
        {Array.from(
          { length: Math.ceil(sortedEmployees.length / employeesPerPage) },
          (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
      <div className="d-flex justify-content-between">
        <p>Filtered Employees: {filteredEmployees.length}</p>
        <p>Total Employees: {employees.length}</p>
      </div>
      <div className="text-center">
        <Link href="/pages/EmpCreate">
          <button className="btn btn-success">Create New Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default EmpListing;





