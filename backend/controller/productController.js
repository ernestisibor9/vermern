const Product = require('../model/Product')


const addProduct = async(req, res) =>{
    try {
        const {name, description, price, image} = req.body
        // Image upload
        const imageName = req.file.filename
        const product = await Product.create({
            name,
            description,
            price,
            image: imageName,
        })
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: product,
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


  // Fetch all products
  const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().sort({createdAt: -1});
        return res.status(200).json({
            success: true,
            products: products,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
  };


    // Get single Product
    const getOneProduct = async (req, res) => {
        const id = req.params.id;
        try {
          const product = await Product.findById(id);
          if (!product) {
            throw new Error("Product not found");
          }
          res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product: product,
          });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      };


      // Update Product
const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
      if (!product) {
        throw new Error("Product not found");
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: product,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };


    // Delete Product
    const deleteProduct = async (req, res) => {
        const id = req.params.id;
        try {
          const product = await Product.findByIdAndDelete(id);
          if (!product) {
            throw new Error("Product not found");
          }
          res.status(200).json({
            success: true,
            message: "Product deleted successfully",
          });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
      };

module.exports = {addProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct }