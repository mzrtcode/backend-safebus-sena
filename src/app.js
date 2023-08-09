import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config.js' // Se importa un archivo de configuración (contiene variables de entorno)
import autenticacionRoutes from './routes/autenticacion.routes.js'
import localidadesRouter from './routes/localidades.routes.js'
import rutasRouter from './routes/rutas.routes.js'
import conductoresRouter from './routes/conductores.routes.js'
import propietariosRouter from './routes/propietarios.routes.js'
import vehiculosRouter from './routes/vehiculos.routes.js'
import agenciasRouter from './routes/agencias.routes.js'
import vendedoresRouter from './routes/vendedores.routes.js'

/* import https from 'https'
import fs from 'fs' */
const app = express() // Se crea una instancia de la aplicación Express

// Configurar opciones del servidor HTTPS
/* const options = {
  key: fs.readFileSync('../server.key'),
  cert: fs.readFileSync('../server.crt')
}

const server = https.createServer(options, app)
 */
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) // Se utiliza el middleware de CORS para permitir solicitudes cruzadas desde http://localhost:5173
app.use(morgan('dev')) // Se utiliza el middleware de morgan en el formato "dev" para el registro de solicitudes HTTP en la consola
app.use(express.json()) // Se utiliza el middleware de express.json() para analizar los cuerpos de solicitud en formato JSON
app.use(cookieParser()) // Se utiliza el middleware de cookie-parser para analizar las cookies de las solicitudes entrantes

app.use('/api', localidadesRouter) // Se utiliza el enrutador localidadesRouter para manejar las rutas relacionadas con localidades, que se encuentran bajo el prefijo /api
app.use('/api', autenticacionRoutes) // Se utiliza el enrutador autenticacionRoutes para manejar las rutas relacionadas con autenticación, que también se encuentran bajo el prefijo /api
app.use('/api', rutasRouter)
app.use('/api', conductoresRouter)
app.use('/api', propietariosRouter)
app.use('/api', vehiculosRouter)
app.use('/api', agenciasRouter)
app.use('/api', vendedoresRouter)

export default app // Se exporta la instancia de la aplicación Express como el módulo predeterminado
