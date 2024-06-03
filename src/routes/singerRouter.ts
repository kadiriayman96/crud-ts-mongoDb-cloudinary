import { getAllSingers, getOneSinger, createSinger } from "../controllers/singerController";
import { Router } from "express";
import  upload  from "../middlewares/uploadImage";

const singerRouter = Router();

singerRouter.post('/newSinger', upload.single('image'), createSinger);
singerRouter.get("/", getAllSingers);
singerRouter.get("/:name", getOneSinger);

export default singerRouter;
