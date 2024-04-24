const jwt = require("jsonwebtoken");


const generarJWT = ( uid ) =>{
    return new Promise( ( resolve, reject ) =>{
        const payload = {uid}
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: "24h",
        }, (error, token) => {
            if( error ){
                //no se pudo crear token
                reject(" Error al generar el jwt");
            }else{
                //token
                resolve( token );
            }
        });
    });
}

const comprobarJWT = ( token = "" ) =>{
    try{
        const  { uid } = jwt.verify( token, process.env.JWT_KEY );
        return [true, uid];

    }catch(error){
       return [false, null];
    }
}

module.exports = {generarJWT, comprobarJWT}