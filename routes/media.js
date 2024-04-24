//Path:    api/media

const { crearCategoria, getCategorias, crearTematica, crearContenido, getTematicas, getContenidos, deleteCategory } = require("../controllers/media");

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.post("/newCategory",  [
    check("name","El username es obligatorio").not().isEmpty(),
    check("urlImagen","El roll es obligatorio").not().isEmpty(),
    validarCampos
] ,crearCategoria);

router.post("/crearTematica",  [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("categoria","La categoria es obligatoria").not().isEmpty(),
    check("permisos","Los permisos son obligatorios").not().isEmpty(),
    validarCampos
] ,crearTematica);

router.post("/crearContenido",  [
    check("titulo","El username es obligatorio").not().isEmpty(),
    check("urlImagen","La imagen es obligatorio").not().isEmpty(),
    check("creador","El autor es obligatorio").not().isEmpty(),
    check("tematica","La tematica es obligatoria").not().isEmpty(),
    validarCampos
] ,crearContenido);

router.get("/getCategories",getCategorias);
router.get("/getTematicas",getTematicas);
router.get("/getContenidos",getContenidos);

router.delete("/deleteCategory",deleteCategory);





module.exports = router;