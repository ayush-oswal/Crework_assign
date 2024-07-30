"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const Router = express_1.default.Router();
Router.post('/signin', auth_1.signin);
Router.post('/signup', auth_1.signup);
exports.default = Router;
