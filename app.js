const express = require('express');
const mongoose  = require('mongoose')
const url = 'mongodb+srv://ismail:I$m@i|@12333@task.aummm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();
const cors = require('cors');

// Routers
const UserRouter = require('./routes/users');

app.use(cors());

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});
const con = mongoose.connection;

con.on("open",()=>{
    console.log("Connected to mongo");
});


app.use(express.json())



//router middlewares
app.use('/users',UserRouter);


const port = 80;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});