const Product = require('../model/Product')
const express = require('express');
const cloudnary = require('../utils/cloudinary')

const addProduct = async(req, res) =>{
    try {
        const {name, description, price, image} = req.body
        const result = await cloudnary.uploader.upload(image, {
            folder: "products",
        })
        const product = await Product.create({
            name,
            description,
            price,
            image:{
                public_id: result.public_id,
                url: result.secure_url,
            }
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

module.exports = {addProduct}