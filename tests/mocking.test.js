import { it, expect, describe, vi } from "vitest";

describe("test suite", () => {
  it("sendText", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("Ok");

    sendText("message");

    expect(sendText).toHaveBeenCalledWith("message");
    expect(sendText).toHaveReturnedWith("Ok");
  });
});
