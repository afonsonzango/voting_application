import { Router } from "express";
import actionsController from "../routesControllers/actionsRoutesController";
import isLoggedIn from "../../middlewares/isLogedIn";

const router = Router();

router.get('/export-pdf-keys/:series', isLoggedIn, new actionsController().exportPdfKeys);
router.get('/delete-key/:key_id', isLoggedIn, new actionsController().removeKey);

export default router;