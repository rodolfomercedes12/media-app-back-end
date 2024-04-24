const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");



const crearUsuario = async(req, res = response) => {

    const{ email, username } = req.body;

    try{
     const existeEmail = await  Usuario.findOne( {email: email } );
     const existeUsername = await  Usuario.findOne( {username: username } ); 
     if( existeEmail ){
         return res.status(400).json({
             ok:false,
             msg: "El correo ya está en uso"
         });
     } 
     if( existeUsername ){
        return res.status(400).json({
            ok:false,
            msg: "El usuario ya está en uso"
        });
    }   
    const usuario = new Usuario( req.body );
    await usuario.save();

    return res.json({
        ok:true,
        usuario,
    }); 



    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error al registrarse"
        });
    }

}

const login = async(req, res = response) => {

  
    
    const { email, username } = req.body;


    try{
       const usuarioDB = await  Usuario.findOne( {email:email, username: username} );
       if( !usuarioDB ){
           return res.status(404).json({
               ok:false,
               msg: "Usuario no encontrado"
           });
       }


        return res.json({
            ok:true,
            usuario: usuarioDB,
        }); 

    }catch(error){
        console.log( error );
        return res.status(500).json({
            ok:false,
            msg: "Error al iniciar sesión"
        });
    }

    
}




const renewToken = async (req, res = response) =>{
    
    const uid = req.uid;
    const token = await generarJWT( uid );

    console.log("Se generó un nuevo token!")

    const usuario = await Usuario.findById( uid );

    res.json({
       ok:true,
       usuario,
       token
    });
}



module.exports = { crearUsuario, login, renewToken }