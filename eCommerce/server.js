const express = require('express');
const router = require('./router/index');
const routerCarro = require('./router/indexCarro')
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout.hbs'),
    partialsDir: path.join(__dirname, './views')
}));

app.set('view engine', 'hbs');
const PORT = 5000;
app.use('/productos', router);
app.use('/carro', routerCarro);



const server = app.listen(PORT, () =>{
    console.log('servidor levantado en puerto ' + server.address().port);
})

server.on('error', (error) => console.log('hubo un error ${error}'));