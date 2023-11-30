import { Router } from 'express'
import { eliminarTiquete, obtenerTiquetesPorId, registrarTiquete } from '../controllers/tiquetes.controller.js'
import { autenticacionRequerida, autenticacionVendedor } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/tiquetes/:id', autenticacionRequerida, obtenerTiquetesPorId)
router.post('/tiquetes', autenticacionVendedor, registrarTiquete)
router.delete('/tiquetes/:id', autenticacionVendedor, eliminarTiquete)


export default router // Se exporta la instancia de enrutador como el módulo predeterminado
