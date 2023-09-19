import { Router } from 'express'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'
import { obtenerEstadisticasVendedorId, obtenerEstadisticasVendedores } from '../controllers/estadisticas.controller.js'


const router = Router()

router.get('/estadisticas', autenticacionRequerida, obtenerEstadisticasVendedores)
router.get('/estadisticas/:id', autenticacionRequerida, obtenerEstadisticasVendedorId)



export default router // Se exporta la instancia de enrutador como el módulo predeterminado
