import { Router } from 'express'
import { obtenerVehiculos } from '../controllers/vehiculos.controller.js'

const router = Router()

router.get('/vehiculos', obtenerVehiculos)

export default router
