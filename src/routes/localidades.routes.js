import { Router } from 'express';
import { validarSchema } from "../middlewares/schemaValidator.middleware.js";
import { actualizarLocalidad, crearLocalidad, eliminarLocalidad, obtenerLocalidad, obtenerLocalidades } from '../controllers/localidades.controller.js';
import {crearLocalidadSchema} from '../schemas/localidades.schema.js';
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js';

const router = Router();

router.get('/localidades', obtenerLocalidades);
router.get('/localidades/:id', obtenerLocalidad)
router.post(
    '/localidades',
    autenticacionRequerida,
    validarSchema(crearLocalidadSchema),
    crearLocalidad);
router.put('/localidades/:id', actualizarLocalidad);
router.delete('/localidades/:id', eliminarLocalidad);



export default router;