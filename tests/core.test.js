import { it, expect, describe } from "vitest";
import { getCoupons, calculateDiscount } from "../src/core";

describe("getCoupons", () => {
  const coupons = getCoupons();

  it("should return an array", () => {
    expect(Array.isArray(coupons)).toBeTruthy();
  });

  it("should return at least one coupon", () => {
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should have a discount greater than 0 & less than 1", () => {
    coupons.forEach((coupon) => {
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });

  it("should have code property", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });
  it("should have discount property", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeTruthy();
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given right code", () => {
    expect(calculateDiscount(100, "SAVE10")).toBe(90);
    expect(calculateDiscount(100, "SAVE20")).toBe(80);
  });

  it("should handle non-numeric values", () => {
    expect(calculateDiscount("100", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-100, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(100, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(100, "INVALID")).toBe(100);
  });
});
