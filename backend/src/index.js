import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db/db.js";
import cors from "cors";
import { app, server } from "./lib/socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Middleware
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
    console.log("server is running at port: " + PORT);
    connectDb();
});
