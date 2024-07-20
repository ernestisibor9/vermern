import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const users = {
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  };
  const [user, setUser] = useState(users);

  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.phone === ""
    ) {
        toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://bookeeper-backend.onrender.com/api/user/register",
          user
        );
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <h3 className="text-center p-2">Registration Form</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={inputChangeHandler}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={inputChangeHandler}
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={inputChangeHandler}
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={inputChangeHandler}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      onChange={inputChangeHandler}
                      placeholder="Age"
                    />
                  </div>
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
