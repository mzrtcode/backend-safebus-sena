import { Router } from 'express'
import { obtenerTiquetesPorId, registrarTiquete } from '../controllers/tiquetes.controller.js'

const router = Router()

router.get('/tiquetes/:id', obtenerTiquetesPorId)
router.post('/tiquetes', registrarTiquete)


export default router // Se exporta la instancia de enrutador como el módulo predeterminado
