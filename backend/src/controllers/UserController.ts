import express from 'express'
import user from '../models/user';
import interview from '../models/interview';
import chatbot from '../models/chatbot';

export class UserController {
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
        .catch((err) => console.log(err));
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

}