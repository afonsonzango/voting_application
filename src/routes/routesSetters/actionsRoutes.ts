import { Router } from "express";
import actionsController from "../routesControllers/actionsRoutesController";

const router = Router();

router.get('/export-pdf-keys/:series', new actionsController().exportPdfKeys);
router.get('/delete-key/:key_id', new actionsController().removeKey);

export default router;