import { Router } from "express";
import dashRoutes from "../routesControllers/dashRoutesControllers";
import isLoggedIn from "../../middlewares/isLogedIn";

const routes = Router();

routes.get('/arquive-votation', isLoggedIn, new dashRoutes().arquiveVotation);
routes.get('/arquive-keys', isLoggedIn, new dashRoutes().arquiveKeys);
routes.get('/arquive-keys/all/:keys_id', isLoggedIn, new dashRoutes().arquiveKeysAll);
routes.get('/arquive-waries', isLoggedIn, new dashRoutes().arquiveWariesAll);
routes.get('/arquive-votation/watch', isLoggedIn, new dashRoutes().watch);

export default routes;