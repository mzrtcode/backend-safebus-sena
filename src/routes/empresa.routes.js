import { Router } from 'express'
import { obtenerEmpresa } from '../controllers/empresa.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'


const router = Router()

router.get('/empresa', autenticacionRequerida, obtenerEmpresa)


export default router // Se exporta la instancia de enrutador como el módulo predeterminado
