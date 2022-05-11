"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysql2_1 = __importDefault(require("mysql2"));
const { DB_HOST, DB_USER, DB_PW, DB } = process.env;
const pool = mysql2_1.default.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    database: DB,
    connectionLimit: 10,
});
module.exports = pool;
