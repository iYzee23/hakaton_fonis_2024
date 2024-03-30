"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const interview_1 = __importDefault(require("../models/interview"));
class UserController {
    constructor() {
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
    }
}
exports.UserController = UserController;
