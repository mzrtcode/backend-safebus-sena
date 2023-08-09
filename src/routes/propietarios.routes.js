import { Router } from 'express'
import { obtenerPropietarios } from '../controllers/propietarios.controller.js'

const router = Router()

router.get('/propietarios', obtenerPropietarios)

export default router
