import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Home() {
  const [userInfo, setUserInfo] = useState();

  const getPersonData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        "https://bookeeper-backend.onrender.com/api/user/getloggedinuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
        setUserInfo(response.data.user);
        console.log(userInfo);
      }
      else{
        toast.error('Invalid authorization');
      }
    } 
    catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonData();
  }, []);

  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const response = await axios.get(
      "https://bookeeper-backend.onrender.com/api/product/getallproducts"
    );
    console.log(response.data.products);
    setProducts(response.data.products);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const navigate = useNavigate();

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    // window.location.href = "/";
    navigate('/login');
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteproduct/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Welcome {userInfo?.name}</h1>
      <h1>Email: {userInfo?.email}</h1>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
      <button className="btn btn-primary">See Profile</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={require(`../images/${product.image}`)}
                    alt=""
                    width="80px"
                    height="80px"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <Link to = {`/edit/${product._id}`} className="btn btn-primary">Edit</Link>
                  <button onClick={()=>deleteProduct(product._id)}className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
