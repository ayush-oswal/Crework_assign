import  express  from "express";
import { signin, signup } from "../controllers/auth";

const Router = express.Router();

Router.post('/signin',signin)
Router.post('/signup',signup)

export default Router