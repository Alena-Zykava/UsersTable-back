const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user123:user123@cluster0.t7anp.mongodb.net/ userstable?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`server on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();
