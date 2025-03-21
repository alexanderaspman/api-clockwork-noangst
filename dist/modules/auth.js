"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};
exports.hashPassword = hashPassword;
const createJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.json({ message: 'auh auh auh, you need to respect my authority!' });
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        res.status(401);
        res.json({ message: 'auh auh auh, you need to respect my authority! Get Toked' });
        res.send('auh auh auh, you need to respect my authority!');
        return;
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401);
        res.json({ message: 'auh auh auh, you need to respect my authority! Token dont seem right' });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map