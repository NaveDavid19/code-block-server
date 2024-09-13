"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeBlock_routes_1 = require("../api/codeBlock/codeBlock.routes");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_service_1 = require("./services/socket.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    credentials: true,
};
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3030;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve('public')));
}
else {
    app.use((0, cors_1.default)(corsOptions));
}
app.use('/api/codeBlock', codeBlock_routes_1.codeBlockRoutes);
(0, socket_service_1.setupSocketAPI)(server);
app.get('*', (req, res) => {
    console.log('Catch-all route hit for:', req.originalUrl);
    res.sendFile(path_1.default.resolve('public', 'index.html'));
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
