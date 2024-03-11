"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const main_1 = require("../coverage/src/main");
(0, vitest_1.describe)('calculateDiscount', () => {
    (0, vitest_1.it)('should return discounted price if given right code', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(100, 'SAVE10')).toBe(90);
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(100, 'SAVE20')).toBe(80);
    });
    (0, vitest_1.it)('should handle negative price', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(-100, 'SAVE10')).toMatch(/invalid/i);
    });
    (0, vitest_1.it)('should handle invalid discount code', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(100, 'INVALID')).toBe(100);
    });
});
