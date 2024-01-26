require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRoutes.js');
const auth = require('./middleware/authentication.js')
const blogRouter = require('./routes/blogRoutes.js')
const notFound = require('./utils/notFound.js')

// middleware
app.use(express.json());

// routes
app.use('/api/v1', authRouter);
app.use('/api/v1/blog',auth, blogRouter); 
app.use(notFound);
// app.get('/test',auth, (req, res) => {
//     res.send('passed authentication');

// })




const start = async () => {
    try {
        await mongoose.connect(process.env.db_URL);
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT} and db connected...`)
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

start();