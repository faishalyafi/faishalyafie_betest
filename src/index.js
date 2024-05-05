import { Router  } from "express";
const router = Router();
import user from "./modules/user/route.js";

router.use('/user', user);

export default router