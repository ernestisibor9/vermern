const express = require('express');
const { addProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require('../controller/productController');
const route = express.Router();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/book/src/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })


route.post('/addproduct', upload.single('image'), addProduct)
route.get('/getallproducts', getAllProducts)
route.get('/getoneproduct/:id', getOneProduct)
route.put('/updateproduct/:id', updateProduct)
route.delete('/deleteproduct/:id', deleteProduct)

module.exports = route;