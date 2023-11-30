import { Router } from 'express'
import {  autenticacionVendedor } from '../middlewares/validarToken.middleware.js'
import { obtenerReportePlanillajeController, obtenerReporteRelacionPlanillasController } from '../controllers/reportes.controller.js'


const router = Router()

router.get('/reportes/resumen-pasajes', autenticacionVendedor, obtenerReportePlanillajeController)
router.get('/reportes/relacion-planillas', autenticacionVendedor, obtenerReporteRelacionPlanillasController)


export default router // Se exporta la instancia de enrutador como el módulo predeterminado
