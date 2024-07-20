const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
dotenv.config()
const userRoute = require('./route/userRoute')
const productRoute = require('./route/productRoute')
const cors = require('cors')

let PORT = process.env.PORT || 5000;
dbConnect()

app.get('/', async(req, res)=>{
    res.send("Good things sweet")
})

app.use(express.json())
app.use(cors())
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
