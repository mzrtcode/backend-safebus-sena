import { pool } from '../db.js'

export const obtenerTiquetesPorId = async (req, res) => {
    try {
      const { id } = req.params
      const [resultado] = await pool.query('SELECT * FROM tiquetes WHERE id_planilla = ?', [id])
  
      if (resultado.length === 0) {
        return res.status(404).json({ mensaje: 'No existe la planilla' })
      }
  
      res.status(200).json(resultado[0])
    } catch (error) {
      console.log(error)
      res.status(500).json({ mensaje: 'Error al obtener los tiquetes' })
    }
  }