import express from 'express';
const app = express();
import databaseConnect from './src/config/db.js';
databaseConnect()
const port = process.env.PORT || 5050
app.listen(port,()=>{
    console.log(`server is running on port :${port}`)
})