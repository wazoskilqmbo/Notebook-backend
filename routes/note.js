import { Router } from "express";

const router = Router();

import {
    createNotes,
    getUserNotes,
    updateNote,
    deleteNote
} from "../controllers/note.js"

import { fetchUser } from "../middlewares/fetchUser.js";


router.use('/createNote',fetchUser);
router.use('/userNotes',fetchUser);
router.use('/updateNote/:id',fetchUser);
router.use("/deleteNote/:id",fetchUser);


router.route("/createNote").post(createNotes);
router.route("/userNotes").get(getUserNotes);
router.route("/updateNote/:id").put(updateNote);
router.route("/deleteNote/:id").delete(deleteNote);

export default router;