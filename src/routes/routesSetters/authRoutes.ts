import { Router } from "express";
import authRoutes from "../routesControllers/authRoutesController";
import notLoggedIn from "../../middlewares/notLogedIn";
import isLoggedIn from "../../middlewares/isLogedIn";

const router = Router();

router.get('/login', notLoggedIn, new authRoutes().loginScreen);
router.post('/set-loged-in', notLoggedIn, new authRoutes().setLogedIn);
router.get('/log-out', isLoggedIn, new authRoutes().logOut);
router.get('/user-settings/change-username', new authRoutes().UserSettings);
router.get('/user-settings/change-password', new authRoutes().ChangePassword);

//Posts Routes
router.post('/voting', notLoggedIn, new authRoutes().setVoting)

export default router;