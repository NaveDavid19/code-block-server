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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCodeBlock = exports.getCodeBlock = exports.getCodeBlocks = void 0;
const codeBlock_service_1 = require("./codeBlock.service");
const getCodeBlocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlocks = yield codeBlock_service_1.codeBlocksService.query();
        res.json(codeBlocks);
    }
    catch (err) {
        console.error('Error fetching code blocks:', err);
        res.status(500).send('Cannot get code blocks');
    }
});
exports.getCodeBlocks = getCodeBlocks;
const getCodeBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codeBlockId } = req.params;
        const codeBlock = yield codeBlock_service_1.codeBlocksService.getById(codeBlockId);
        res.json(codeBlock);
    }
    catch (err) {
        console.error('Cannot get codeBlock', err);
        res.status(500).send('Cannot get codeBlock');
    }
});
exports.getCodeBlock = getCodeBlock;
const updateCodeBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = req.body;
        if (!codeBlock._id ||
            !codeBlock.title ||
            !codeBlock.initialTemplate ||
            typeof codeBlock.visitorCounter !== 'number') {
            res.status(400).send('Invalid code block data');
            return;
        }
        const updatedCodeBlock = yield codeBlock_service_1.codeBlocksService.update(codeBlock);
        res.json(updatedCodeBlock);
    }
    catch (err) {
        console.error('Error updating code block:', err);
        res.status(500).send('Failed to update code block');
    }
});
exports.updateCodeBlock = updateCodeBlock;
