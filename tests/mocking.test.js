import { it, expect, describe, vi } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");

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

describe("getShippingInfo", () => {
  it("should return error message if shipping is unavailiable", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const result = getShippingInfo("US");
    expect(result).toMatch(/unavailable/i);
  });

  it("should return cost for exact destination", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });
    const result = getShippingInfo("US");

    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

describe("renderPage", () => {
  it("should render corrent content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should track page view", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});
