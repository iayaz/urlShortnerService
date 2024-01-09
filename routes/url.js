import express from "express";
import { analyticsofhit, getShortID, visitSite } from "../controllers/url.js";
const router = express.Router();

router.post("/", getShortID);
router.get("/:shortId", visitSite);
router.get("/analytics/:shortId", analyticsofhit);
export default router;
