import { Router } from 'express'
import { actualizarVehiculo, crearVehiculo, eliminarVehiculo, obtenerVehiculo, obtenerVehiculos } from '../controllers/vehiculos.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/vehiculos', obtenerVehiculos)
router.get('/vehiculos/:id', obtenerVehiculo)
router.post(
  '/vehiculos',
  autenticacionRequerida, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearVehiculo // Controlador de creación de localidad.
)
router.put('/vehiculos/:id', actualizarVehiculo) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/vehiculos/:id', eliminarVehiculo) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
