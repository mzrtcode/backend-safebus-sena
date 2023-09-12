import { Router } from 'express'
import { actualizarVendedor, crearVendedor, eliminarVendedor, obtenerVendedor, obtenerVendedores, resetearClave } from '../controllers/vendedores.controller.js'
import { autenticacionAdmin, autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/vendedores',autenticacionRequerida, obtenerVendedores)
router.get('/vendedores/:id', autenticacionRequerida, obtenerVendedor)
router.post(
  '/vendedores',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearVendedor // Controlador de creación de localidad.
)
router.post('/vendedores/:id/resetear-clave', autenticacionAdmin, resetearClave)
router.put('/vendedores/:id', autenticacionAdmin, actualizarVendedor) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/vendedores/:id', autenticacionAdmin, eliminarVendedor) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
