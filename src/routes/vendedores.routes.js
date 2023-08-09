import { Router } from 'express'
import { obtenerVendedores } from '../controllers/vendedores.controller.js'

const router = Router()

router.get('/vendedores', obtenerVendedores)

export default router
