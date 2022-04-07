const fs = require('fs');

class Contenedor {

    constructor(archivo){
        this.path = archivo
    }

    async save(obj){
        let entryControl = false;
        try{
            const content = fs.readFileSync(this.path)
            const content_parsed = JSON.parse(content)
            content_parsed.forEach(element => {
                if (obj.titulo === element.titulo) {
                    entryControl = true;
                }});
            if (!entryControl || content_parsed.length == 0) {
                obj["timestamp"] = Date.now();
                obj["id"] = (content_parsed[content_parsed.length -1].id) + 1
                fs.writeFileSync(this.path,JSON.stringify([...content_parsed,obj]))
                return ((content_parsed[content_parsed.length -1].id) + 1);
            }
        }
        catch(err){
            fs.writeFileSync(this.path,JSON.stringify([{...obj, timestamp: Date.now(), id: 1}]))
            return (1);
        }
        
    }

    async getById(numero) {
        try {
            if (!fs.existsSync(this.path)) {
                throw Error('File does not exist.');
            }
            const content = await fs.promises.readFile(this.path, 'utf-8');
            let object = null;
            object = JSON.parse(content).filter(({id}) => id === parseInt(numero));
            if (object.length == 0) {
                return {error: 'producto no encontrado'}
            }else{
                return object
            }
        } catch (error) {
            throw Error(error.message);
        }
    }

    async getAll() {
        try {
            if (!fs.existsSync(this.path)) {
                throw Error('File does not exist.');
            }
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
           return (err);
        }
    }

    async deleteById(numero) {
        try {
            if (isNaN(numero)){
                console.log("CHECKPOINT fail");
                throw Error('Method expects a number.');
            }
            if (!fs.existsSync(this.path)) {
                throw Error('File does not exist.');
            }
            const content = fs.readFileSync(this.path);
            const content_parsed = JSON.parse(content);
            console.log("CHECKPOINT 1: " + content_parsed);
            const newList = content_parsed.filter(element => element.id !== parseInt(numero));
            console.log("CHECKPOINT 2: " + newList);
            await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2), 'utf-8');
        } catch (error) {
            throw Error(error.message);
        }
    }

    async deleteAll() {
        try {
            if (!fs.existsSync(this.path)) {
                throw Error('File does not exist.');
            }
            let content = []
            await fs.promises.writeFile(this.path, content, 'utf-8');
        } catch (error) {
            throw Error(error.message);
        }
    }

    async updateById(req) {

        const {titulo,precio,url,descripcion,codigo,stock} = req.body;
        const idURL = parseInt(req.params.id);
        const content = JSON.parse(fs.readFileSync(this.path));
        
        try {
            let busqueda = content.find(el => el.id == idURL)
            if(busqueda.id === idURL){
                busqueda.titulo = titulo;
                busqueda.precio = precio;
                busqueda.url = url;
                busqueda.descripcion = descripcion;
                busqueda.codigo = codigo;
                busqueda.stock = stock;
                //this.deleteById(idURL);
                //content.push(busqueda);
                const json_products=JSON.stringify(content);
                fs.writeFileSync(this.path,json_products,'utf-8');
                return busqueda;
            }
        } catch (error) {
            throw "Error server"
        }
    }

    async getRandom() {
        const numero = Math.floor(Math.random() * 3) + 1;
        const obj = this.getById(numero).then(val => {return val});
        return obj
    }

} 


module.exports = Contenedor;