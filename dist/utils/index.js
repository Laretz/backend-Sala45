"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.formatTime = exports.formatDate = void 0;
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};
exports.formatDate = formatDate;
const formatTime = (date) => {
    return date.toTimeString().split(' ')[0].slice(0, 5);
};
exports.formatTime = formatTime;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=index.js.map