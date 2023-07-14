import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import './config.js';
import autenticacionRoutes from './routes/autenticacion.routes.js';
import localidadesRouter from './routes/localidades.routes.js';

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use('/api',localidadesRouter);
app.use('/api',autenticacionRoutes);


export default app;