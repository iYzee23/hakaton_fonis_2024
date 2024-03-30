import express from 'express'
import path from 'path';
import { UserController } from '../controllers/UserController';
const userRouter = express.Router();

userRouter.route('/login').post(
 (req, res) => new UserController().login(req, res)
)

userRouter.route('/getPotvrdjeneSimulacije').post(
    (req, res) => new UserController().getPotvrdjeneSimulacije(req, res)
   )

export default userRouter;