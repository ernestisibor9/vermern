import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const users = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);

  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigation = useNavigate()

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.email === "" ||
      user.password === "" 
    ) {
        toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          user
        );
        // console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("user", JSON.stringify(response.data.token));
          // for role
          // if(response.data.person.role === "admin") {
          //   navigation('/admin');
          // }
          // if(response.data.person.role === "teacher") {
          //   navigation('/teacher');
          // }
          // if(response.data.person.role === "student") {
          //   navigation('/student');
          // }
          navigation('/')
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
              <h3 className="text-center p-2">Login Form</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
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
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="mt-2 mb-2">
                    <Link to = '/forgot-password'>Forgot Password</Link>
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

export default Login;
