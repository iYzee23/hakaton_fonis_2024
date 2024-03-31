import express from 'express'
import path from 'path';
import { UserController } from '../controllers/UserController';
const userRouter = express.Router();

userRouter.route('/getPotvrdjeniPairProgr').post(
    (req, res) => new UserController().getPotvrdjeniPairProgr(req, res)
)

userRouter.route('/run').post(
    (req, res) => new UserController().run(req, res)
)

userRouter.route('/getBotSve').post(
    (req, res) => new UserController().getBotSve(req, res)
)

userRouter.route('/login').post(
 (req, res) => new UserController().login(req, res)
)

userRouter.route('/getPotvrdjeneSimulacije').post(
    (req, res) => new UserController().getPotvrdjeneSimulacije(req, res)
)

userRouter.route('/getPotvrdjeneSimulacijePair').post(
    (req, res) => new UserController().getPotvrdjeneSimulacijePair(req, res)
)


userRouter.route('/postaviFeedbackSimulacije').post(
    (req, res) => new UserController().postaviFeedbackSimulacije(req, res)
)
userRouter.route('/definisiAvailability').post(
    (req,res) =>new UserController().definisiAvailability(req, res)
)

userRouter.route('/getAvailability').post(
    (req,res) =>new UserController().getAvailability(req, res)
)

userRouter.route('/getUnpairedInterview').post(
    (req,res) =>new UserController().getUnpairedInterview(req, res)
)

userRouter.route('/createInterviewRequest').post(
    (req,res) =>new UserController().createInterviewRequest(req, res)
)

userRouter.route('/pairInterview').post(
    (req,res) =>new UserController().pairInterview(req, res)
)

userRouter.route('/getQuestions').post(
    (req, res) => new UserController().getQuestions(req, res)
)

userRouter.route('/getUnpairedInterviewPair').post(
    (req,res) =>new UserController().getUnpairedInterviewPair(req, res)
)

userRouter.route('/createInterviewPairRequest').post(
    (req,res) =>new UserController().createInterviewPairRequest(req, res)
)

userRouter.route('/pairInterviewPair').post(
    (req,res) =>new UserController().pairInterviewPair(req, res)
)

userRouter.route('/getQuestionPair').post(
    (req, res) => new UserController().getQuestionPair(req, res)
)


export default userRouter;