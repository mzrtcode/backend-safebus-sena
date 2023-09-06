import { Router } from 'express'
import { obtenerTiquetesPorId } from '../controllers/tiquetes.controller'

const router = Router()

router.get('/tiquetes', obtenerTiquetesPorId)

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
