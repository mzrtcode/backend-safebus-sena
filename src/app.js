import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import './config.js'

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


export default app;