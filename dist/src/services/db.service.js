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
exports.dbService = void 0;
const mongodb_1 = require("mongodb");
const index_1 = require("../../config/index");
exports.dbService = {
    getCollection,
};
let dbConn = null;
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield _connect();
            const collection = db.collection(collectionName);
            return collection;
        }
        catch (err) {
            throw err;
        }
    });
}
function _connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbConn)
            return dbConn;
        try {
            const client = yield mongodb_1.MongoClient.connect(index_1.config.dbURL);
            const db = client.db(index_1.config.dbName);
            dbConn = db;
            return db;
        }
        catch (err) {
            throw err;
        }
    });
}
