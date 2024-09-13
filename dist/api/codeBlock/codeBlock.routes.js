"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeBlockRoutes = void 0;
const express_1 = __importDefault(require("express"));
const codeBlock_controller_1 = require("./codeBlock.controller");
exports.codeBlockRoutes = express_1.default.Router();
exports.codeBlockRoutes.get('/', codeBlock_controller_1.getCodeBlocks);
exports.codeBlockRoutes.get('/:codeBlockId', codeBlock_controller_1.getCodeBlock);
exports.codeBlockRoutes.put('/', codeBlock_controller_1.updateCodeBlock);
