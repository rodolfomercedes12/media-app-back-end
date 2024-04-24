const { io } = require("../index");
//const { getIncidencias, getIncidenciasTipo, grabarMensaje, getUser } = require("../controllers/incidencias");
const { crearCategoria, getCategorias } = require("../controllers/media");


io.on("connection", async client => {
  


    //CATEGORIA============================
    client.on("crear-categoria", async ( payload ) => {
      await crearCategoria(payload);
      const categorias = await getCategorias();
      client.emit("nuevaCategoria", categorias)
      io.emit("nuevaCategoria", categorias);

    });




    client.on("disconnect", async () => {
        console.log("Cliente Desconectado");  
    });

});