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
exports.codeBlocksService = void 0;
const mongodb_1 = require("mongodb");
const db_service_1 = require("../../src/services/db.service");
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('codeBlocks');
            const codeBlocks = yield collection.find().toArray(); // Use find() to ensure proper query
            return codeBlocks;
        }
        catch (err) {
            throw new Error(`Failed to query code blocks: ${err}`);
        }
    });
}
function getById(codeBlockId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield db_service_1.dbService.getCollection('codeBlocks');
            const codeBlock = yield collection.findOne({
                _id: new mongodb_1.ObjectId(codeBlockId),
            });
            return codeBlock;
        }
        catch (err) {
            console.error(`while finding toy ${codeBlockId}`, err);
            throw err;
        }
    });
}
function update(codeBlock) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockToSave = {
                initialTemplate: codeBlock.initialTemplate,
                title: codeBlock.title,
                visitorCounter: codeBlock.visitorCounter,
                solution: codeBlock.solution,
                value: codeBlock.value,
            };
            const collection = yield db_service_1.dbService.getCollection('codeBlocks');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(codeBlock._id) }, { $set: codeBlockToSave });
            return codeBlock;
        }
        catch (err) {
            console.error(`cannot update toy ${codeBlock._id}`, err);
            throw err;
        }
    });
}
exports.codeBlocksService = {
    query,
    getById,
    update,
};
