import { Router } from 'express'
import { actualizarAgencia, crearAgencia, eliminarAgencia, obtenerAgencia, obtenerAgencias } from '../controllers/agencias.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/agencias', obtenerAgencias)
router.get('/agencias/:id', obtenerAgencia)
router.post(
  '/agencias',
  autenticacionRequerida, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearAgencia // Controlador de creación de localidad.
)
router.put('/agencias/:id', actualizarAgencia) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/agencias/:id', eliminarAgencia) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router
