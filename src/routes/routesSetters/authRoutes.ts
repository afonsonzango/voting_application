import { Router } from "express";
import authRoutes from "../routesControllers/authRoutesController";

const router = Router();

router.get('/login', new authRoutes().loginScreen);

export default router;