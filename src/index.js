const express = require('express');

const app = express();

app.listen(3000, (req, res) => {
    console.log('App is running at the port 3000');
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/',(req, res)) => {
    res.send('<h1>This is about page');
}

app.get('/server', (req, res) => {
    
})