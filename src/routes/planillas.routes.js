import { Router } from 'express'
import { completarViaje, crearPlanilla, eliminarPlanilla, obtenerPlanillas } from '../controllers/planillas.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()
router.get('/planillas', autenticacionRequerida, obtenerPlanillas)
router.post('/planillas', crearPlanilla)
router.post('/planillas/despachar/:id', completarViaje)
router.post('/planillas/:id', eliminarPlanilla)


export default router
