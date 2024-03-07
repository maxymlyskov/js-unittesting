import { it, expect, describe } from "vitest";
import { max, fizzBuzz, calcualteAverage, factorial } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });
  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });
  it("should return the first argument if arguments are equal", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fizzBuzz", () => {
  it("should return FizzBuzz if n is multiple of 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("should return Fizz if n is multiple of 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  it("should return Buzz if n is multiple of 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
  it("should return arg as a string if n is not multiple of 5 or 3", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

describe("calculateAverage", () => {
  it("should return NaN if array is empty", () => {
    expect(calcualteAverage([])).toBe(NaN);
  });
  it("should calculate the average of an array with a single element", () => {
    expect(calcualteAverage([1])).toBe(1);
  });
  it("should calculate the average of an array with two elements", () => {
    expect(calcualteAverage([1, 3])).toBe(2);
  });
  it("should calculate the average of an array with three elements", () => {
    expect(calcualteAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("should return 1 is number is 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("should return 1 is number is 1", () => {
    expect(factorial(1)).toBe(1);
  });
  it("should return 2 if number is 2", () => {
    expect(factorial(2)).toBe(2);
  });
  it("should return 24 if number is 4", () => {
    expect(factorial(4)).toBe(24);
  });
  it("should return undefined if number is negative", () => {
    expect(factorial(-5)).toBeUndefined();
  });
});
