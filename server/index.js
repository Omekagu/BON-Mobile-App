const express = require('express');
const app = express();


app.get('/', (req, res)=>{
res.send('Hello server connected')
})
app.listen(5001, console.log('server is up and running '));
