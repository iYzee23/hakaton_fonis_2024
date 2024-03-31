"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const interview_1 = __importDefault(require("../models/interview"));
const chatbot_1 = __importDefault(require("../models/chatbot"));
class UserController {
    constructor() {
        this.getBotSve = (req, res) => {
            let rb = req.body.rb;
            chatbot_1.default.findOne({ rb: rb }).then((data) => {
                res.json(data);
            }).catch((err) => console.log(err));
            ;
        };
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ korime: username, lozinka: password }).then((kor) => {
                res.json(kor);
            }).catch((err) => console.log(err));
        };
        this.getPotvrdjeneSimulacije = (req, res) => {
            let username = req.body.username;
            interview_1.default.find({ $or: [{ ucesnik1: username }, { ucesnik2: username }] })
                .then((simulations) => {
                res.json(simulations);
            })
                .catch((err) => console.log(err));
        };
        this.postaviFeedbackSimulacije = (req, res) => {
            let id = req.body.id;
            let feedb = req.body.feedback;
            interview_1.default.findOneAndUpdate({ id: id }, { feedback: feedb }).then((data) => {
                res.json({ message: 'ok' });
            }).catch((err) => console.log(err));
        };
    }
}
exports.UserController = UserController;
