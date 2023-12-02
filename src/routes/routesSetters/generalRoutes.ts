import { Router } from "express";
import generalRoutes from "../routesControllers/generalRoutesControllers";

const router = Router();

router.get('/', new generalRoutes().redirect);
router.get('/information', new generalRoutes().information);
router.get('/voting', new generalRoutes().voting);
router.get('/voting/select', new generalRoutes().select);

export default router;