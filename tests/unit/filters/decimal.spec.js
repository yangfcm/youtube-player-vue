import decimal from "@/filters/decimal";

describe("Test decimal filter", () => {
  test("should convert a number correctly", () => {
    const testNum = 12345678;
    expect(decimal(testNum)).toBe("12,345,678");
  });

  test("should return empty string if provided an invalid number", () => {
    const invalidNum = "num";
    expect(decimal(invalidNum)).toBe("");
  });
});
