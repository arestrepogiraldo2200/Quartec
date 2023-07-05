
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');


const clients = require('./src/routers/clients.js');
const cotizaciones = require('./src/routers/cotizacion.js');
const inicio = require('./src/routers/inicio.js');
const index = require('./src/routers/index.js');
const user = require('./src/routers/user.js');
const precios = require('./src/routers/precios.js');
const session = require('express-session')

const app = express();

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(cors())
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './public/files')));

app.use(
  session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 500000}));

app.use(methodOverride('_method'));

app.use(inicio);
app.use(clients);
app.use(cotizaciones);
app.use(index);
app.use(user);
app.use(precios);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});