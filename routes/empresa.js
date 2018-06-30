const express = require("express");
const path = require("path");

const router = express.Router();

router.use((req, res, next) => {
    console.log("Soy el middleware de Empresa/Madrid");

    // Los middleware pueden modificar cosas
    req.periodo = req.query.periodo;

    next();
});

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../www/empresa.html")));

router.get("/madrid", (req, res) => {
    // req.query: hace referencia a parámetros query en la url (?xxx=yyy&xxx=yyy)
    if (req.query.periodo === "dia") {
        return res.sendFile(path.join(__dirname, "../www/madrid.html"));
    }

    return res.sendFile(path.join(__dirname, "../www/madrid-noche.html")) 
});


router.get("/madrid/:direccion", (req, res) => {
    // req.params: hace referencia a parámetros puros de url
    // el param toma el nombre que yo le de
    if (req.params.direccion === "dia") {
        return res.sendFile(path.join(__dirname, "../www/madrid.html"));
    }

    return res.sendFile(path.join(__dirname, "../www/madrid-noche.html")) 
});

router.get("/fallo", (req, res) => {
    const fs = require("fs");
    const file = fs.readFileSync("./archivoquenoexiste.algo");

    return res.send(file);
});

module.exports = router;