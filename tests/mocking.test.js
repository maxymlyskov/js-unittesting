import { it, expect, describe, vi, beforeEach } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";
import security from "../src/libs/security";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originModule = await importOriginal();
  return {
    ...originModule,
    sendEmail: vi.fn(),
  };
});

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

describe("submitOrder", () => {
  const creditCard = { creditCardNumber: "123" };
  const order = { totalAmount: 100 };

  it("should return success status", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: true });
  });

  it("should return error status", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: false, error: "payment_error" });
  });

  it("should charge correct amount", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });
});

describe("signUp", () => {
  const email = "test@domain.com";

  it("should return false if email is not valid", async () => {
    const result = await signUp("invalid-email");
    expect(result).toBeFalsy();
  });
  it("should return true if email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBeTruthy();
  });
  it("should send welocme email if email is valid", async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

describe("login", () => {
  const email = "name@domain.com";
  it("should send email with code", async () => {
    const spy = vi.spyOn(security, "generateCode");
    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

describe("isOnline", () => {
  it("should return false if current time is outside available hours", () => {
    vi.setSystemTime(new Date("2024-01-01 07:59:00"));
    expect(isOnline()).toBeFalsy();

    vi.setSystemTime(new Date("2024-01-01 20:01:00"));
    expect(isOnline()).toBeFalsy();
  });
  it("should return true if current hour is withing opening hours", () => {
    vi.setSystemTime(new Date("2024-01-01 8:00:00"));
    expect(isOnline()).toBeTruthy();

    vi.setSystemTime(new Date("2024-01-01 19:59:00"));
    expect(isOnline()).toBeTruthy();
  });
});
