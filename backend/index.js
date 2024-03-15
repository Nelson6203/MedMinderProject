const express = require('express');
const baseDatos = require('./config/db');
const routes = require('./app/routes/routes');

baseDatos(); // Iniciamos base
const app = express();

app.use(express.json()); 

app.use('/api', routes); 

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});
 
app.listen(4000, () => {
    console.log('Server running port 4000');
});
