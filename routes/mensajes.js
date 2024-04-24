/*  Path: /api/mensajes  */

const { Router } = require("express");
const { obtenerChat } = require("../controllers/mensajes");
const router = Router();


router.get("/:de",  obtenerChat );

module.exports = router;

