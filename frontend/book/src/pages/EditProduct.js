import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


function EditProduct() {
    const {id} = useParams()
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState(null);

    // API to get individual product

    const getOneProduct = async()=>{
        try{
            const response = await axios.get(`http://localhost:5000/api/product/getoneproduct/${id}`);
            console.log(response.data);
            setName(response.data.product.name);
            setDescription(response.data.product.description);
            setPrice(response.data.product.price);
        }
        catch(err){

        }
    }

    useEffect(()=>{
        getOneProduct()
    }, [])

  // handleSubmit - to connect the backend to the frontend
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (
      name === "" ||
      description === "" ||
      price === "" 
    ) {
      toast.error("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/product/updateproduct/${id}`, {name, description, price}

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
  };


  return (
    <div>
       <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <h3 className="text-center p-2">Edit Product</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                     
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="decription"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="price"
                      className="form-control"
                      name="price"
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                     
                    />
                  </div>
                  <div className="mt-2 mb-2">
                    <button type="submit" className="btn btn-primary">
                      UpdateProduct
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

export default EditProduct
