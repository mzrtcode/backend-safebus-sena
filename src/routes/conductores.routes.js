import { Router } from 'express'
import { obtenerConductores } from '../controllers/conductores.controller.js'

const router = Router()

router.get('/conductores', obtenerConductores)

export default router
