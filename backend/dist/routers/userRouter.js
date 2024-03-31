"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const userRouter = express_1.default.Router();
userRouter.route('/getBotSve').post((req, res) => new UserController_1.UserController().getBotSve(req, res));
userRouter.route('/login').post((req, res) => new UserController_1.UserController().login(req, res));
userRouter.route('/getPotvrdjeneSimulacije').post((req, res) => new UserController_1.UserController().getPotvrdjeneSimulacije(req, res));
userRouter.route('/postaviFeedbackSimulacije').post((req, res) => new UserController_1.UserController().postaviFeedbackSimulacije(req, res));
userRouter.route('/definisiAvailability').post((req, res) => new UserController_1.UserController().definisiAvailability(req, res));
userRouter.route('/getAvailability').post((req, res) => new UserController_1.UserController().getAvailability(req, res));
userRouter.route('/getUnpairedInterview').post((req, res) => new UserController_1.UserController().getUnpairedInterview(req, res));
userRouter.route('/createInterviewRequest').post((req, res) => new UserController_1.UserController().createInterviewRequest(req, res));
userRouter.route('/pairInterview').post((req, res) => new UserController_1.UserController().pairInterview(req, res));
userRouter.route('/getQuestions').post((req, res) => new UserController_1.UserController().getQuestions(req, res));
exports.default = userRouter;
