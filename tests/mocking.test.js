import { it, expect, describe, vi } from "vitest";
import { getPriceInCurrency } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";

vi.mock("../src/libs/currency");

describe("test suite", () => {
  it("sendText", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("Ok");

    sendText("message");

    expect(sendText).toHaveBeenCalledWith("message");
    expect(sendText).toHaveReturnedWith("Ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in current currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");

    expect(price).toBe(15);
  });
});
