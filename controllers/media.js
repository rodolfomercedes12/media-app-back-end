const { response } = require("express");
const Categoria = require("../models/categoria");
const Tematica = require("../models/tematica");
const Contenido = require("../models/contenido");



const crearCategoria = async(payload) => {


     try{
      
     const categoria = new Categoria( payload );
     await categoria.save();
     return true;
 
 
 
     }catch(error){
        return false;
     }
 
 }



 const crearTematica = async(req, res = response) => {

 
     try{

        const { nombre } = req.body

    const existeTematica = await  Tematica.findOne( {nombre: nombre } ); 
     if( existeTematica ){
         return res.status(400).json({
             ok:false,
             msg: "La tematica ya esta registrada"
         });
     }   
       
     const tematica = new Tematica( req.body );
     await tematica.save();
 
     return res.json({
         ok:true,
         tematica,
     }); 
 
 
 
     }catch(error){
         console.log(error);
         return res.status(500).json({
             ok:false,
             msg: "Error al crear la tematica"
         });
     }
 
 }







 const crearContenido = async(req, res = response) => {

 
    try{
    
    const contenido = new Contenido( req.body );
    await contenido.save();

    return res.json({
        ok:true,
        contenido,
    }); 



    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error al crear la tematica"
        });
    }

}




 const getCategorias = async ( req, res = response ) => {
   
    try {
        const categorias = await Categoria.find();
        return res.json({
            ok:true,
            categorias,
        }); 
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Error al cargar categorias"
        });
    }  

}

const getTematicas = async ( req, res = response ) => {
    
    try {
        const tematicas = await Tematica.find().populate("categoria");
        return res.json({
            ok:true,
            tematicas,
        }); 
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Error al cargar tematicas"
        });
    }  

}


const getContenidos = async ( req, res = response ) => {
   
    try {
        const contenidos = await Contenido.find()
        .populate({
            path: 'tematica',
            populate: {
              path: 'categoria',
            },
          })
        .populate("creador")
        .sort({ createdAt: 1 });
        return res.json({
            ok:true,
            contenidos,
        }); 
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Error al cargar contenidos"
        });
    }  

}


const deleteCategory = async (req, res = response) => {
    try {
        const { categoryId } = req.body;
        console.log(categoryId)
       const result =  await Categoria.deleteOne({ _id: categoryId });
       return res.json({
        ok:true,
        result,
    }); 

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Error al borrar categoría"
        });
    }
}

 module.exports = { crearCategoria, getCategorias, crearTematica, getTematicas, crearContenido, getContenidos, deleteCategory }