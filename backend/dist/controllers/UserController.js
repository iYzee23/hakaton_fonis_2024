"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const interview_1 = __importDefault(require("../models/interview"));
const chatbot_1 = __importDefault(require("../models/chatbot"));
const availability_1 = __importDefault(require("../models/availability"));
const question_1 = __importDefault(require("../models/question"));
const pair_programming_1 = __importDefault(require("../models/pair_programming"));
class UserController {
    constructor() {
        this.getPotvrdjeniPairProgr = (req, res) => {
            let username = req.body.username;
            pair_programming_1.default.find({ $or: [{ ucesnik1: username }, { ucesnik2: username }] })
                .then((simulations) => {
                res.json(simulations);
            })
                .catch((err) => console.log(err));
        };
        this.run = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const vm = require('vm');
            const util = require('util');
            const customLog = (...args) => {
                const output = args.map(arg => util.inspect(arg)).join(' ');
                return output;
            };
            const userCode = req.body.code;
            let scriptOutput = "";
            try {
                const script = new vm.Script(userCode);
                const context = vm.createContext({
                    console: {
                        log: (...args) => {
                            scriptOutput += customLog(...args) + '\n';
                        }
                    }
                });
                yield script.runInContext(context);
                res.json({ "output": scriptOutput });
            }
            catch (err) {
                res.json({ "error": err.message });
                console.log(err.message);
            }
        });
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
                .
                    catch((err) => console.log(err));
        };
        this.getPotvrdjeneSimulacijePair = (req, res) => {
            let username = req.body.username;
            pair_programming_1.default.find({
                $or: [
                    { ucesnik1: username, ucesnik2: { $ne: "" } },
                    { ucesnik2: username, ucesnik1: { $ne: "" } }
                ]
            })
                .then((simulations) => {
                res.json(simulations);
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Error occurred while fetching simulations." });
            });
        };
        this.postaviFeedbackSimulacije = (req, res) => {
            let id = req.body.id;
            let feedb = req.body.feedback;
            interview_1.default.findOneAndUpdate({ id: id }, { feedback: feedb }).then((data) => {
                res.json({ message: 'ok' });
            }).catch((err) => console.log(err));
        };
        this.definisiAvailability = (req, res) => {
            let av = req.body.availability;
            availability_1.default.findOne({ datum: av.datum, korime: av.korime }).then((radvreme) => {
                if (radvreme != null) {
                    //update ovog
                    radvreme.updateOne({ datum: av.datum, korime: av.korime }, { pocetakRada: av.pocetakRada, krajRada: av.krajRada,
                        slobodanDan: av.slobodanDan }).then((uspelo) => {
                        res.json({ message: "ok" });
                    }).catch((err) => res.json({ message: "Greska pri update-ovanju radnog vremena!" }));
                }
                else {
                    let novoRV = new availability_1.default(av);
                    novoRV.save().then((uspelo) => {
                        res.json({ message: "ok" });
                    }).catch((err) => res.json({ message: "Greska pri cuvanju radnog vremena!" }));
                }
            });
        };
        this.getAvailability = (req, res) => {
            let korime = req.body.korime;
            availability_1.default.find({ korime: korime }).then((rv) => {
                res.json(rv);
            }).catch((err) => console.log(err));
        };
        this.getUnpairedInterview = (req, res) => {
            let type = req.body.type;
            interview_1.default.find({ tip: type, status: "pending" }).then((rv) => {
                res.json(rv);
            }).catch((err) => console.log(err));
        };
        this.createInterviewRequest = (req, res) => {
            let inter = req.body.interview;
            // Assuming interview is your Mongoose model
            interview_1.default.findOne({}, {}, { sort: { 'id': -1 } })
                .then((latestInterview) => {
                if (latestInterview) {
                    // Set the id of the new interview object
                    inter.id = latestInterview.id + 1; // Assuming id is a sequential number
                    // Create a new interview object
                    let noviInter = new interview_1.default(inter);
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                        res.json({ message: "ok" });
                    })
                        .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: "error" });
                    });
                }
                else {
                    // If there are no existing interviews, set id to 1
                    inter.id = 1;
                    // Create a new interview object
                    let noviInter = new interview_1.default(inter);
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                        res.json({ message: "ok" });
                    })
                        .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: "error" });
                    });
                }
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
        };
        this.pairInterview = (req, res) => {
            let inter = req.body.interview;
            interview_1.default.findOneAndUpdate({ id: inter.id }, inter, { new: true })
                .then((updatedInterview) => {
                if (updatedInterview) {
                    res.json({ message: "ok", updatedInterview });
                }
                else {
                    res.status(404).json({ message: "Interview not found" });
                }
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
        };
        this.getQuestions = (req, res) => {
            let rb = req.body.rb;
            question_1.default.findOne({ id: rb }).then((data) => {
                res.json(data);
            }).catch((err) => console.log(err));
            ;
        };
        this.getUnpairedInterviewPair = (req, res) => {
            let type = req.body.type;
            pair_programming_1.default.find({ status: "pending" }).then((rv) => {
                res.json(rv);
            }).catch((err) => console.log(err));
        };
        this.createInterviewPairRequest = (req, res) => {
            let inter = req.body.interview;
            // Assuming interview is your Mongoose model
            pair_programming_1.default.findOne({}, {}, { sort: { 'id': -1 } })
                .then((latestInterview) => {
                if (latestInterview) {
                    // Set the id of the new interview object
                    inter.id = latestInterview.id + 1; // Assuming id is a sequential number
                    // Create a new interview object
                    let noviInter = new pair_programming_1.default(inter);
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                        res.json({ message: "ok" });
                    })
                        .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: "error" });
                    });
                }
                else {
                    // If there are no existing interviews, set id to 1
                    inter.id = 1;
                    // Create a new interview object
                    let noviInter = new pair_programming_1.default(inter);
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                        res.json({ message: "ok" });
                    })
                        .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: "error" });
                    });
                }
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
        };
        this.pairInterviewPair = (req, res) => {
            let inter = req.body.interview;
            pair_programming_1.default.findOneAndUpdate({ id: inter.id }, inter, { new: true })
                .then((updatedInterview) => {
                if (updatedInterview) {
                    console.log("found");
                    res.json({ message: "ok", updatedInterview });
                }
                else {
                    res.status(404).json({ message: "Interview not found" });
                }
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
        };
        this.getQuestionPair = (req, res) => {
            let rb = req.body.rb;
            question_1.default.findOne({ id: rb }).then((data) => {
                res.json(data);
            }).catch((err) => console.log(err));
            ;
        };
    }
}
exports.UserController = UserController;
