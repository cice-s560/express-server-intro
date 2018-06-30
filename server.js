const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// Middleware
// Interceptor que contorla el flujo entre la entrada y salida
// Nos permite analizar y manipular las peticiones antes de dar respuesta
// use: es el uso de middlewares convencionales en Express
//      req: Objeto que representa la petición (request)
//      res: Objeto que representa la respuesta (response)
//      next: un callback que ejecuta el siguiente middleware
app.use((req, res, next) => {
    console.log("Primer middleware");

    // Haciendo uso de este callback
    // seguimos el flujo al siguiente middleware
    next();
});
app.use((req, res, next) => {
    console.log("Segundo middleware");

    next();
});

// Algunos middlewares vienen integrados en Express
// .static, es un servidor de estáticos que trae por defecto
app.use(express.static(path.join(__dirname, "public")));

// Control de routas por verbos HTTP
app.get("/", (req, res) => res.send("Hola desde root"));
app.get("/saludo", (req, res) => res.sendFile(path.join(__dirname, "www/saludo.html")));


// app.get("/empresa", (req, res) => res.sendFile(path.join(__dirname, "www/empresa.html")));
// app.get("/empresa/madrid", (req, res) => res.sendFile(path.join(__dirname, "www/madrid.html")));

// Un middleware se puede asociar a una ruta concreta
const empresaRouter = require("./routes/empresa");
app.use("/empresa", empresaRouter);


// Middleware de errores
app.use((err, req, res, next) => {
    console.error("[ERROR GENERAL]", req.url);
    return res.status(500).send("Error de servidor");
});


app.listen(3000);