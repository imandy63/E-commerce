import InventoryRouter from "./inventory";
import express from "express";

const router = express.Router();

router.use("", InventoryRouter);

export default router;
