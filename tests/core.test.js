import { it, expect, describe } from "vitest";
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
} from "../src/core";

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

describe("validateUserInput", () => {
  it("should return success message if given valid input", () => {
    expect(validateUserInput("john", 20)).toMatch(/success/i);
  });

  it("should return error if username is number", () => {
    expect(validateUserInput(123, 20)).toMatch(/invalid/i);
  });

  it("should return error if username is less than 3 characters", () => {
    expect(validateUserInput("jo", 20)).toMatch(/invalid/i);
  });

  it("should return error if username is longer than 256 characters", () => {
    expect(validateUserInput("A".repeat(256), 20)).toMatch(/invalid/i);
  });

  it("should return error if age is less than 18", () => {
    expect(validateUserInput("john", 10)).toMatch(/invalid/i);
  });
  it("should return error if age is greater than 100", () => {
    expect(validateUserInput("john", 101)).toMatch(/invalid/i);
  });

  it("should return error if age is not a number", () => {
    expect(validateUserInput("john", "20")).toMatch(/invalid/i);
  });

  it("should return an error if both values are invalid", () => {
    expect(validateUserInput(0, "")).toMatch(/invalid username/i);
    expect(validateUserInput(0, "")).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("should return false if price is not in a range", () => {
    expect(isPriceInRange(10, 20, 30)).toBe(false);
    expect(isPriceInRange(100, 20, 30)).toBe(false);
  });
  it("should return true if price is equal to min or max of a range", () => {
    expect(isPriceInRange(5, 5, 30)).toBe(true);
    expect(isPriceInRange(30, 5, 30)).toBe(true);
  });
  it("should return true if price is withing a range", () => {
    expect(isPriceInRange(20, 20, 30)).toBe(true);
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username is less than 5 characters", () => {
    expect(isValidUsername("A".repeat(minLength - 1))).toBe(false);
  });
  it("should return false if username is more than 15 characters", () => {
    expect(isValidUsername("A".repeat(maxLength + 1))).toBe(false);
  });
  it("should return true if username has less than 15 and more than 5 characters", () => {
    expect(isValidUsername("A".repeat(maxLength))).toBe(true);
    expect(isValidUsername("A".repeat(minLength))).toBe(true);
  });
  it("should return true if username is within the length constraint", () => {
    expect(isValidUsername("A".repeat(maxLength - 1))).toBe(true);
    expect(isValidUsername("A".repeat(minLength + 1))).toBe(true);
  });
  it("should return false for invalid input type", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(123)).toBe(false);
  });
});

describe("canDrive", () => {
  it("should return error if given wrong country code", () => {
    expect(canDrive(20, "INVALID")).toMatch(/invalid/i);
  });
  it("should return true if given right age and country code", () => {
    expect(canDrive(16, "US")).toBe(true);
    expect(canDrive(17, "UK")).toBe(true);
  });
  it("should return false if given age less than it should", () => {
    expect(canDrive(15, "US")).toBe(false);
    expect(canDrive(16, "UK")).toBe(false);
  });
  it("should return true if given age that is equal to requirement", () => {
    expect(canDrive(16, "US")).toBe(true);
    expect(canDrive(17, "UK")).toBe(true);
  });
});
