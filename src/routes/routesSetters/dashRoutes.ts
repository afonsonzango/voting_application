import { Router } from "express";
import dashRoutes from "../routesControllers/dashRoutesControllers";

const routes = Router();

routes.get('/arquive-votation', new dashRoutes().arquiveVotation);
routes.get('/arquive-keys', new dashRoutes().arquiveKeys);
routes.get('/arquive-keys/all/:keys_id', new dashRoutes().arquiveKeysAll);
routes.get('/arquive-waries', new dashRoutes().arquiveWariesAll);

export default routes;