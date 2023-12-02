import { Router } from "express";
import dashRoutes from "../routesControllers/dashRoutesControllers";

const routes = Router();

routes.get('/arquive-votation', new dashRoutes().arquiveVotation);
routes.get('/arquive-keys', new dashRoutes().arquiveKeys);

export default routes;