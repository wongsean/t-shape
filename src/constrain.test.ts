import { number } from "io-ts/lib/Decoder";
import { constrain } from "./constrain";
import { isRight } from "fp-ts/lib/Either";

const PositiveNumber = constrain(number, (n) => n > 0, "Positive");

test("decode", () => {
  const maybe1 = PositiveNumber.decode("string");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = PositiveNumber.decode(-1);
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = PositiveNumber.decode(1);
  expect(isRight(maybe3)).toBeTruthy();
});

test("type", () => {
  const maybe = PositiveNumber.decode(123);

  if (isRight(maybe)) {
    // can pass as number
    const num: number = maybe.right;

    // cannot pass as other type like number
    // @ts-expect-error
    const str: string = maybe.right;

    expect(num).toBe(123);
  } else {
    fail("it should not be left");
  }
});
