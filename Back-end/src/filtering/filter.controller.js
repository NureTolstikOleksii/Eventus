import { Router } from "express";
import { FilterService } from "./filter.service.js";

const router = Router();
const filterService = new FilterService();

router.post('/', (req, res) => {
    
});

export const filterRouter = router;