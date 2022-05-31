const express = require('express');
const connection = require('./db/db');
const timeRoutes = require('./routes/timers');


const app = express()
const port = process.env.PORT || 3000

// database connection
connection();

app.use(express.json())
app.use(timeRoutes);

app.listen(port, ()=>{
    console.log('server is up on port '+port)
})