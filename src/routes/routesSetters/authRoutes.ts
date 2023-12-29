import { Router } from "express";
import authRoutes from "../routesControllers/authRoutesController";

const router = Router();

router.get('/login', new authRoutes().loginScreen);

//Posts Routes
router.post('/voting', new authRoutes().setVoting)

export default router;