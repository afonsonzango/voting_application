import { Router } from "express";
import authRoutes from "../routesControllers/authRoutesController";
import notLoggedIn from "../../middlewares/notLogedIn";

const router = Router();

router.get('/login', notLoggedIn, new authRoutes().loginScreen);
router.post('/set-loged-in', notLoggedIn, new authRoutes().setLogedIn);

//Posts Routes
router.post('/voting', new authRoutes().setVoting)

export default router;