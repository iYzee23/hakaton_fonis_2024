import express from 'express'
import user from '../models/user';
import interview from '../models/interview';
import chatbot from '../models/chatbot';
import availability from '../models/availability';
import question from '../models/question';
import pair_programming from '../models/pair_programming';

export class UserController {
    getPotvrdjeniPairProgr = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        pair_programming.find({ $or: [{ ucesnik1: username }, { ucesnik2: username }] })
        .then((simulations) => {
            res.json(simulations);
        })
        .catch((err) => console.log(err));
    };

    run  = async (req:any, res:any) => {
        const vm = require('vm');
        const util = require('util');
        const customLog = (...args: any[]) => {
            const output = args.map(arg => util.inspect(arg)).join(' ');
            return output;
        };
        const userCode = req.body.code;
        let scriptOutput = "";
        try {
            const script = new vm.Script(userCode);
            const context = vm.createContext({
                console: {
                    log: (...args: any) => {
                        scriptOutput += customLog(...args) + '\n';
                    }
                }
            });
            await script.runInContext(context);
            res.json({"output":scriptOutput})
        } catch (err:any) {
            res.json({"error": err.message})
            console.log(err.message)
        }
    };

    getBotSve = (req: express.Request, res: express.Response) => {
        let rb = req.body.rb;

        chatbot.findOne({rb:rb}).then(
            (data) => {
                res.json(data);
            }
        ).catch((err)=>console.log(err));;
    };

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        
        user.findOne({korime:username,lozinka:password}).then(
            (kor)=>{
                res.json(kor);
            }
        ).catch((err)=>console.log(err));
    }

    getPotvrdjeneSimulacije = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        interview.find({ $or: [{ ucesnik1: username }, { ucesnik2: username }] })
        .then((simulations) => {
            res.json(simulations);
        })
        .
        catch((err) => console.log(err));
    }

    getPotvrdjeneSimulacijePair = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
    
        pair_programming.find({
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
    }


    postaviFeedbackSimulacije  = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let feedb = req.body.feedback;

        interview.findOneAndUpdate({id:id},{feedback:feedb}).then(
            (data)=>{
                res.json({message:'ok'});
            }
        ).catch((err)=>console.log(err));
    }

    definisiAvailability = (req: express.Request, res: express.Response) => {
        let av = req.body.availability;

        availability.findOne({datum:av.datum,korime:av.korime}).then(
            (radvreme)=>{
                if(radvreme!=null){
                    //update ovog
                    radvreme.updateOne({datum:av.datum,korime:av.korime},{pocetakRada:av.pocetakRada,krajRada:av.krajRada,
                    slobodanDan:av.slobodanDan}).then(
                        (uspelo)=>{
                            res.json({message:"ok"});
                        }
                    ).catch((err)=>res.json({message:"Greska pri update-ovanju radnog vremena!"}));
                }else{
                    let novoRV = new availability(av);
                    novoRV.save().then(
                        (uspelo)=>{
                            res.json({message:"ok"});
                        }
                    ).catch((err)=>res.json({message:"Greska pri cuvanju radnog vremena!"}))
                }
            }
        )
    }

    getAvailability = (req: express.Request, res: express.Response) => {
        let korime = req.body.korime;
        
        availability.find({korime:korime}).then(
            (rv)=>{
                res.json(rv);
            }
        ).catch((err)=>console.log(err));
    }

    getUnpairedInterview = (req: express.Request, res: express.Response) => {
        let type = req.body.type;

        interview.find({tip:type, status: "pending"}).then(
            (rv)=>{
                res.json(rv);
            }
        ).catch((err)=>console.log(err));
    }
    createInterviewRequest = (req: express.Request, res: express.Response) => {
        let inter = req.body.interview;
    
        // Assuming interview is your Mongoose model
        interview.findOne({}, {}, { sort: { 'id': -1 } })
            .then((latestInterview) => {
                if (latestInterview) {
                    // Set the id of the new interview object
                    inter.id = latestInterview.id + 1; // Assuming id is a sequential number
                    
                    // Create a new interview object
                    let noviInter = new interview(inter);
    
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                            res.json({ message: "ok" });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "error" });
                        });
                } else {
                    // If there are no existing interviews, set id to 1
                    inter.id = 1;
    
                    // Create a new interview object
                    let noviInter = new interview(inter);
    
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
    }
    

    pairInterview = (req: express.Request, res: express.Response) => {
        let inter = req.body.interview;
    
        interview.findOneAndUpdate({ id: inter.id }, inter, { new: true })
            .then((updatedInterview) => {
                if (updatedInterview) {
                    res.json({ message: "ok", updatedInterview });
                   
                } else {
                    res.status(404).json({ message: "Interview not found" });
                    
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
    }
    

    getQuestions = (req: express.Request, res: express.Response) => {
        let rb = req.body.rb;

        question.findOne({id:rb}).then(
            (data) => {
                res.json(data);
            }
        ).catch((err)=>console.log(err));;
    };

    getUnpairedInterviewPair = (req: express.Request, res: express.Response) => {
        let type = req.body.type;

        pair_programming.find({ status: "pending"}).then(
            (rv)=>{
                res.json(rv);
            }
        ).catch((err)=>console.log(err));
    }
    
    createInterviewPairRequest = (req: express.Request, res: express.Response) => {
        let inter = req.body.interview;
    
        // Assuming interview is your Mongoose model
        pair_programming.findOne({}, {}, { sort: { 'id': -1 } })
            .then((latestInterview) => {
                if (latestInterview) {
                    // Set the id of the new interview object
                    inter.id = latestInterview.id + 1; // Assuming id is a sequential number
                    
                    // Create a new interview object
                    let noviInter = new pair_programming(inter);
    
                    // Save the new interview object
                    noviInter.save()
                        .then(() => {
                            res.json({ message: "ok" });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "error" });
                        });
                } else {
                    // If there are no existing interviews, set id to 1
                    inter.id = 1;
    
                    // Create a new interview object
                    let noviInter = new pair_programming(inter);
    
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
    }
    

    pairInterviewPair = (req: express.Request, res: express.Response) => {
        let inter = req.body.interview;
    
        pair_programming.findOneAndUpdate({ id: inter.id }, inter, { new: true })
            .then((updatedInterview) => {
                if (updatedInterview) {
                    console.log("found")
                    res.json({ message: "ok", updatedInterview });
                   
                } else {
                    res.status(404).json({ message: "Interview not found" });
                    
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "error" });
            });
    }

    getQuestionPair = (req: express.Request, res: express.Response) => {
        let rb = req.body.rb;

        question.findOne({id:rb}).then(
            (data) => {
                res.json(data);
            }
        ).catch((err)=>console.log(err));;
    };

}