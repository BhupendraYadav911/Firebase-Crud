"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const EmpCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setValidation(true);
      return;
    }

    const empdata = { name, email, phone, active };

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h2 className="mb-0">Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control ${
                      name.length === 0 && validation ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setValidation(false);
                    }}
                    required
                  />
                  {name.length === 0 && validation && (
                    <div className="invalid-feedback">Enter the name</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    id="active"
                    className="form-check-input"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  <label htmlFor="active" className="form-check-label">
                    Is Active
                  </label>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <Link href="/" passHref>
                  <button className="btn btn-danger ms-2">Back</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
