import { Router } from 'express'
import { obtenerPlanillas } from '../controllers/planillas.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()
router.get('/planillas', autenticacionRequerida, obtenerPlanillas)

export default router
