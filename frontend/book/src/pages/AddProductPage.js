import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


function AddProductPage() {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState(null);


    // Handlesubmit
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        // Check for empty fields
        if(name === "" || description === "" || price === ""){
            toast.error("Please enter the required fields")
        }
        else{
            try {
                const response = await axios.post(
                  "https://bookeeper-backend.onrender.com/api/product/addproduct",
                  formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log(response.data);
                if (response.data.success) {
                  toast.success(response.data.message);
                } else {
                  toast.error(response.data.message);
                }
              } catch (err) {
                console.log(err);
              } 
        }

    }


  return (
    <div>
       <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <h3 className="text-center p-2">Add Product</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="Name of Product"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="decription"
                      onChange={(e)=>setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="price"
                      className="form-control"
                      name="price"
                      onChange={(e)=>setPrice(e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}       
                    />
                  </div>
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      AddProduct
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage
