import { literal } from "./literal";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = literal(null).decode(null);
  expect(isRight(maybe1)).toBeTruthy();

  const maybe2 = literal(undefined).decode(undefined);
  expect(isRight(maybe2)).toBeTruthy();

  const maybe3 = literal("string").decode("string");
  expect(isRight(maybe3)).toBeTruthy();

  const maybe4 = literal(123).decode(123);
  expect(isRight(maybe4)).toBeTruthy();

  const maybe5 = literal(true).decode(true);
  expect(isRight(maybe5)).toBeTruthy();

  const maybe6 = literal("ON", "OFF").decode("OFF");
  expect(isRight(maybe6)).toBeTruthy();

  const maybe7 = literal(null).decode(undefined);
  expect(isRight(maybe7)).toBeFalsy();
});

test("type", () => {
  const maybe = literal("ON").decode("ON");

  if (isRight(maybe)) {
    // can pass as string
    const on: "ON" = maybe.right;

    // cannot pass as other type like number
    // @ts-expect-error
    const off: "OFF" = maybe.right;

    // use them the same way
    expect(on).toBe("ON");
  } else {
    fail("it should not be left");
  }
});
