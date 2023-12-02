import { Router } from "express";

const routes = Router();

import generalRoutes from "./routesSetters/generalRoutes";
import authRoutes from "./routesSetters/authRoutes";
import dashRoutes from "./routesSetters/dashRoutes";

routes.use('/', generalRoutes);
routes.use('/auth', authRoutes);
routes.use('/dashboard', dashRoutes);

export default routes;