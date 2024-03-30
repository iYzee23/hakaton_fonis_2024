import express from 'express'
import user from '../models/user';
import interview from '../models/interview';

export class UserController {
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


}