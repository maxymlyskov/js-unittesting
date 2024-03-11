import { it, expect, describe } from 'vitest'
import { calculateDiscount } from '../coverage/src/main';

describe('calculateDiscount', () => {
    it('should return discounted price if given right code', () => {
        expect(calculateDiscount(100, 'SAVE10')).toBe(90);
        expect(calculateDiscount(100, 'SAVE20')).toBe(80);
    });

    it('should handle negative price', () => {
        expect(calculateDiscount(-100, 'SAVE10')).toMatch(/invalid/i);
    });

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(100, 'INVALID')).toBe(100);
    });
});
