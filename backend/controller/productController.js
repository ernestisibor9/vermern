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
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            products: products,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
  };

module.exports = {addProduct, getAllProducts }