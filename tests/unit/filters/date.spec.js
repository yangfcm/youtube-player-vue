import date from "@/filters/date";

describe("Test date filter", () => {
  test("date filter can convert date correctly", () => {
    const testDate = "2020-07-25T03:57:34Z";
    expect(date(testDate)).toEqual("25 Jul, 2020");
  });

  test("should return empty string if provided an invalid date", () => {
    const invalidDate = "invalid";
    expect(date(invalidDate)).toBe("");
  });
});
