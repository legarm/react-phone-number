const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Configurar variables de entorno
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//start server
const app = express();

//cors
app.use(cors());

//database
const mongodb_url = 'mongodb+srv://luis:admin@cluster0.ct6rt.mongodb.net/phonebook?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;
mongoose.connect(mongodb_url);

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routing
app.use('/', routes());

//Mostrar UI
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
  res.sendFile(express.static(path.join(__dirname, '../build/index.html')));
});

//port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});