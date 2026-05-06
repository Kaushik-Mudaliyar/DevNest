import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dev-nest-ochre.vercel.app"],
    credentials: true,
  }),
);
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   }),
// );
// import routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
// define routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.use(errorMiddleware);
export default app;
