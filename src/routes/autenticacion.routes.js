import { Router } from 'express'
import { cerrarSesion, iniciarSesion, obtenerPerfil, registrarUsuario, verificarSesion } from '../controllers/autenticacion.controller.js'
import { validarSchema } from '../middlewares/schemaValidator.middleware.js'
import { autenticacionSchema, registroSchema } from '../schemas/autenticacion.schema.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router() // Se crea una instancia de enrutador de Express

router.post('/login', validarSchema(autenticacionSchema), iniciarSesion) // Ruta para iniciar sesión. Se aplica el middleware de validación de esquema antes de llamar al controlador de inicio de sesión.
router.post('/registro', validarSchema(registroSchema), registrarUsuario) // Ruta para registrar un usuario. Se aplica el middleware de validación de esquema antes de llamar al controlador de registro de usuario.
router.post('/logout', cerrarSesion) // Ruta para cerrar sesión. Llama al controlador de cierre de sesión.
router.get('/verificar', verificarSesion) // Ruta para verificar la sesión. Llama al controlador de verificación de sesión.
router.get('/perfil', autenticacionRequerida, obtenerPerfil) // Ruta para obtener el perfil de usuario. Llama al controlador de obtención de perfil.

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
