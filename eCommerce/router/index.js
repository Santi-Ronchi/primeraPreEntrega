const { Router } = require('express')
const Contenedor = require('../Contenedor')
const contenedor = new Contenedor('./data/productos.txt');

const router = Router();

//router.get('/', (req, res) => {
//    res.render("formulario")
//});

router.post('/', async (req, res) => {
    const prodAgregado = await contenedor.save(req.body);
    res.redirect('/productos?admin=true');
});

router.get('/', async (req, res) => {
    const productos = await contenedor.getAll();
    res.render("listaProd", {productos: productos, req});
});

router.get('/:producto', async (req, res) => {
    const prodPedido = await contenedor.getById(req.params.producto);
    res.render("detalleProd", {productos: prodPedido, req})
});

router.put('/:id', async (req, res) => {
    if (req.query.admin) {
    await contenedor.updateById(req);
    res.redirect(`/productos/${req.params.id}?admin=true`)
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
});

router.delete('/:id', async (req, res) => {
    if (req.query.admin) {
        await contenedor.deleteById(req.params.id);
        res.redirect('/productos?admin=true');
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
    
});

module.exports = router;