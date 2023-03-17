import { literal } from "./literal";

test("decode", () => {
  const maybe1 = literal(null).safeParse(null);
  expect(maybe1.success).toBeTruthy();

  const maybe2 = literal(undefined).safeParse(undefined);
  expect(maybe2.success).toBeTruthy();

  const maybe3 = literal("string").safeParse("string");
  expect(maybe3.success).toBeTruthy();

  const maybe4 = literal(123).safeParse(123);
  expect(maybe4.success).toBeTruthy();

  const maybe5 = literal(true).safeParse(true);
  expect(maybe5.success).toBeTruthy();

  const maybe6 = literal("ON", "OFF").safeParse("OFF");
  expect(maybe6.success).toBeTruthy();

  const maybe7 = literal(null).safeParse(undefined);
  expect(maybe7.success).toBeFalsy();
});

test("type", () => {
  const maybe = literal("ON").safeParse("ON");

  if (maybe.success) {
    // can pass as string
    const on: "ON" = maybe.data;

    // cannot pass as other type
    // @ts-expect-error
    const off: "OFF" = maybe.data;

    // use them the same way
    expect(on).toBe("ON");
  } else {
    fail("it should not be failed");
  }
});
