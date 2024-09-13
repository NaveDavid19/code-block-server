"use strict";
// config/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const prod_1 = __importDefault(require("./prod"));
const dev_1 = __importDefault(require("./dev"));
if (process.env.NODE_ENV === 'production') {
    exports.config = prod_1.default;
}
else {
    exports.config = dev_1.default;
}
exports.config.isGuestMode = true;
