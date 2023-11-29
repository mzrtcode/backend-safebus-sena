import { Router } from 'express'
import {  autenticacionVendedor } from '../middlewares/validarToken.middleware.js'
import { obtnerReportePlanillaje } from '../controllers/reportes.controller.js'
import { validarSchema } from '../middlewares/schemaValidator.middleware.js'
import { obtenerReportePlanillajeSchema } from '../schemas/reportes.schema.js'

const router = Router()

router.get('/reportes', autenticacionVendedor, validarSchema(obtenerReportePlanillajeSchema), obtnerReportePlanillaje)

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
