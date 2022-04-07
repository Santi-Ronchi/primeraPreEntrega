const { Router } = require('express')
const ContenedorCarro = require('../ContenedorCarro')
const Contenedor = require('../Contenedor')
const contenedorCarro = new ContenedorCarro('./data/carros.txt');
const contenedorProd = new Contenedor('./data/productos.txt')

const routerCarro = Router();

routerCarro.post('/', async (req, res) => {
    const carroAgregado = await contenedorCarro.saveCarro(req.body);
    res.redirect(`/carro/${carroAgregado}`);
});

routerCarro.get('/', async (req, res) => {
    const carros = await contenedorCarro.getAll();
    res.render("listaCarro", {productos: carros, req});
});

routerCarro.delete('/:carroId', async (req, res) => {
    await contenedorCarro.deleteById(req.params.carroId);
    res.redirect('/carro');
});

routerCarro.get('/:carroId', async (req, res) => {
    const carroPedido = await contenedorCarro.getById(req.params.carroId);
    res.render("detalleCarro", {carroPedido: carroPedido, req})
});

routerCarro.delete('/:carroId/:prodId', async (req, res) => {
    const carroPedido = await contenedorCarro.deleteProductById(req.params.carroId, req.params.prodId);
    res.redirect(`/carro/${req.params.carroId}`)
});

routerCarro.post('/:carroId/:prodId', async (req, res) => {
    const prodAgregado = await contenedorCarro.addToCart(req.params.carroId, req.params.prodId);
    res.redirect(`/carro/${req.params.carroId}`);
});

module.exports = routerCarro;