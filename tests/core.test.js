import { it, expect, describe } from "vitest";
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
  fetchData,
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
  it.each([
    { price: -10, result: false, scenario: "less than min" },
    { price: 0, result: true, scenario: "equal to min" },
    { price: 20, result: true, scenario: "greater than min" },
    { price: 100, result: true, scenario: "equal to max" },
    { price: 120, result: false, scenario: "greater then max" },
  ])("should return $result if price is $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
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
  it.each([
    [
      { age: 15, countryCode: "US", result: false },
      { age: 16, countryCode: "US", result: true },
      { age: 17, countryCode: "US", result: true },
      { age: 16, countryCode: "UK", result: false },
      { age: 17, countryCode: "UK", result: true },
      { age: 18, countryCode: "UK", result: true },
    ],
  ])(
    "should return $result if age is $age and country code is $countryCode",
    ({ age, countryCode, result }) => {
      expect(canDrive(age, countryCode)).toBe(result);
    }
  );
});

describe("fetchData", () => {
  it("should return a promise that is resolved to array with more than 1 element", async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(1);
  });
});
