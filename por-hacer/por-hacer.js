const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar el archivo', err);
        console.log("Creado correctamente");
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter((tarea) => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === listadoNuevo.length) {
        return false;
    } else {
        listadoPorHacer = listadoNuevo;
        guardarDB();
        return true;
    }
}

const listarPorEstado = (completado) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter((tarea) => tarea.completado === completado);

    return listadoNuevo;

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    listarPorEstado
};