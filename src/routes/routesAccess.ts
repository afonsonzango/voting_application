import { Router } from "express";

const routes = Router();

import generalRoutes from "./routesSetters/generalRoutes";
import authRoutes from "./routesSetters/authRoutes";
import dashRoutes from "./routesSetters/dashRoutes";
import actionsRoutes from "./routesSetters/actionsRoutes";

routes.use('/', generalRoutes);
routes.use('/auth', authRoutes);
routes.use('/dashboard', dashRoutes);
routes.use('/actions', actionsRoutes);

export default routes;