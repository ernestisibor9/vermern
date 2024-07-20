import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
    const {id, token} = useParams()
    console.log(id);
    console.log(token);
  const users = {
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
      user.password === ""
    ) {
        toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.post(
          `https://bookeeper-backend.onrender.com/api/user/reset-password/${id}/${token}`,
          user
        );
        // console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          // localStorage.setItem("user", JSON.stringify(response.data.token));
          navigation('/login');
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
              <h3 className="text-center p-2">Reset Password</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={inputChangeHandler}
                      placeholder="New Password"
                    />
                  </div>
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      ResetPassword
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

export default ResetPassword;
