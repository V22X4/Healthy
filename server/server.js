const app = require('./app')
const dotenv = require('dotenv').config({path : '../.env'});


const connectDB = require('./config/database');

connectDB();


const server = app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

// Uncaught Exception 
process.on("uncaughtException" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})

// Unhandled Promise errors
process.on("unhandledRejection" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})