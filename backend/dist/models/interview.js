"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Interview = new Schema({
    id: Number,
    ucesnik1: String,
    ucesnik2: String,
    datum: String,
    vreme: String,
    vremeKraja: String,
    tip: String,
    status: String,
    pitanja: [String],
    feedback: [String]
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('Interview', Interview, 'interview');
