import { Router } from "express";
import generalRoutes from "../routesControllers/generalRoutesControllers";
import notLoggedIn from "../../middlewares/notLogedIn";

const router = Router();

router.get('/', notLoggedIn, new generalRoutes().redirect);
router.get('/information', notLoggedIn, new generalRoutes().information);
router.get('/voting', notLoggedIn, new generalRoutes().voting);
router.get('/voting/select/:series/:content', notLoggedIn, new generalRoutes().select);

export default router;