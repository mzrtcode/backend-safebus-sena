import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import './config.js'; // Se importa un archivo de configuración (contiene variables de entorno)
import autenticacionRoutes from './routes/autenticacion.routes.js';
import localidadesRouter from './routes/localidades.routes.js';

const app = express(); // Se crea una instancia de la aplicación Express

app.use(cors({credentials: true, origin: 'http://localhost:5173'})); // Se utiliza el middleware de CORS para permitir solicitudes cruzadas desde http://localhost:5173
app.use(morgan("dev")); // Se utiliza el middleware de morgan en el formato "dev" para el registro de solicitudes HTTP en la consola
app.use(express.json()); // Se utiliza el middleware de express.json() para analizar los cuerpos de solicitud en formato JSON
app.use(cookieParser()); // Se utiliza el middleware de cookie-parser para analizar las cookies de las solicitudes entrantes

app.use('/api', localidadesRouter); // Se utiliza el enrutador localidadesRouter para manejar las rutas relacionadas con localidades, que se encuentran bajo el prefijo /api
app.use('/api', autenticacionRoutes); // Se utiliza el enrutador autenticacionRoutes para manejar las rutas relacionadas con autenticación, que también se encuentran bajo el prefijo /api

export default app; // Se exporta la instancia de la aplicación Express como el módulo predeterminado
