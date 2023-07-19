import { Router } from "express";
const router = Router();

import { CreateUser, loginUser,getUser } from "../controllers/user.js";
import { fetchUser } from "../middlewares/fetchUser.js";

router.route("/createUser").post(CreateUser);
router.route('/loginUser').post(loginUser);
router.use('/loginUser',fetchUser);
router.use('/getUser',fetchUser);
router.route('/getUser').post(getUser);
export default router;