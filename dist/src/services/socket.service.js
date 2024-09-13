"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketAPI = setupSocketAPI;
const socket_io_1 = require("socket.io");
let io = null;
function setupSocketAPI(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', (socket) => {
        console.log('Socket connected');
        socket.on('disconnect', () => {
            console.log(`Socket disconnected [id: ${socket.id}]`);
        });
        socket.on('student-join', ({ msg, data }) => {
            console.log('msg:', msg);
            io === null || io === void 0 ? void 0 : io.emit('increase-watchers', data);
        });
        socket.on('student-left', ({ msg, data }) => {
            console.log('msg:', msg);
            io === null || io === void 0 ? void 0 : io.emit('decrease-watchers', data);
        });
        socket.on('mentor-join', ({ msg, data }) => {
            console.log(`SOCKET-`, msg);
            io === null || io === void 0 ? void 0 : io.emit('mentor-join', data);
        });
        socket.on('mentor-left', ({ msg, data }) => {
            console.log(`SOCKET-`, msg);
            io === null || io === void 0 ? void 0 : io.emit('mentor-left');
        });
        socket.on('code-changed', ({ msg, data }) => {
            console.log('msg:', msg);
            io === null || io === void 0 ? void 0 : io.emit('code-changed', data);
        });
    });
}
