import { Router } from 'express'
import { completarViaje, crearPlanilla, eliminarPlanilla, obtenerPlanillas } from '../controllers/planillas.controller.js'
import { autenticacionRequerida, autenticacionVendedor } from '../middlewares/validarToken.middleware.js'

const router = Router()
router.get('/planillas', autenticacionRequerida, obtenerPlanillas)
router.post('/planillas', autenticacionVendedor, crearPlanilla)
router.put('/planillas/despachar/:id',autenticacionVendedor, completarViaje)
router.delete('/planillas/:id', autenticacionRequerida, eliminarPlanilla)


export default router