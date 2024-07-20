import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const users = {
    email: "",
  };
  const [user, setUser] = useState(users);

  // Function to get whatsover the user type
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

//   const navigation = useNavigate()

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.email === ""
    ) {
        toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/forgotten-password",
          user
        );
        // console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("user", JSON.stringify(response.data.token));
        //   navigation('/')
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
              <h3 className="text-center p-2">Forgot Password</h3>
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
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      ForgotPassword
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

export default ForgotPassword;
