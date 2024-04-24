//Path:    api/login

const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const router = Router();

router.post("/new",  [
    check("username","El username es obligatorio").not().isEmpty(),
    check("roll","El roll es obligatorio").not().isEmpty(),
    check( "email", "El correo es obligatorio" ).isEmail(),
    validarCampos
] ,crearUsuario);

router.post("/",  [
    check( "username", "El username es obligatorio" ).not().isEmpty(),
    check( "email", "El correo es obligatorio" ).isEmail()    
] ,login);

router.get("/renew",validarJWT,  renewToken );

module.exports = router;