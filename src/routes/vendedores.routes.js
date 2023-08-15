import { Router } from 'express'
import { actualizarVendedor, crearVendedor, eliminarVendedor, obtenerVendedor, obtenerVendedores, resetearClave } from '../controllers/vendedores.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/vendedores', obtenerVendedores)
router.get('/vendedores/:id', obtenerVendedor)
router.post(
  '/vendedores',
  autenticacionRequerida, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearVendedor // Controlador de creación de localidad.
)
router.post('/vendedores/:id/resetear-clave', resetearClave)
router.put('/vendedores/:id', actualizarVendedor) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/vendedores/:id', eliminarVendedor) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
