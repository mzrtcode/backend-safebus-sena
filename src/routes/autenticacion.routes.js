import { Router } from "express";
import { cerrarSesion, iniciarSesion, obtenerPerfil, registrarUsuario, verificarSesion } from "../controllers/autenticacion.controller.js";
import { validarSchema } from "../middlewares/schemaValidator.middleware.js";
import { autenticacionSchema, registroSchema } from "../schemas/autenticacion.schema.js";

const router = Router();

router.post("/login", validarSchema(autenticacionSchema), iniciarSesion);
router.post("/registro",validarSchema(registroSchema), registrarUsuario);
router.post("/logout", cerrarSesion);
router.get("/verificar", verificarSesion);
router.get("/pefil", obtenerPerfil);

export default router;