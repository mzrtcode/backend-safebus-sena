import { Router } from 'express'
import { obtenerAgencias } from '../controllers/agencias.controller.js'

const router = Router()

router.get('/agencias', obtenerAgencias)

export default router
