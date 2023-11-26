import { Router } from 'express'
import { actualizarEmpresa, obtenerEmpresa } from '../controllers/empresa.controller.js'
import { autenticacionAdmin, autenticacionRequerida } from '../middlewares/validarToken.middleware.js'
import { validarSchema } from '../middlewares/schemaValidator.middleware.js'
import { actualizarEmpresaSchema } from '../schemas/empresa.schema.js'


const router = Router()

router.get('/empresa', autenticacionRequerida, obtenerEmpresa)
router.put('/empresa', autenticacionRequerida, autenticacionAdmin, validarSchema(actualizarEmpresaSchema), actualizarEmpresa)


export default router // Se exporta la instancia de enrutador como el módulo predeterminado
