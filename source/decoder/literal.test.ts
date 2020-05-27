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
});
