import { Router } from "express";

//Controllers
import * as regionsCtrl from "../controller/regions.controller";

//Middlewares

//Routers
const router = Router();
router.get('/', async (req, res)=>{
    try {
        const data = await regionsCtrl.getAll();
        console.log(`Data in routes: ${data}`);
        return res.status(200).json({
            message: "TEST say HELLO",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error!\n${error}`
        });
    }
});

export default router;