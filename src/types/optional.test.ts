import { string } from "io-ts/lib/Decoder";
import { optional } from "./optional";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = optional(string).decode("string");
  expect(isRight(maybe1)).toBeTruthy();

  const maybe2 = optional(string).decode(undefined);
  expect(isRight(maybe2)).toBeTruthy();

  const maybe3 = optional(string).decode(123);
  expect(isRight(maybe3)).toBeFalsy();

  const maybe4 = optional(string).decode(null);
  expect(isRight(maybe4)).toBeFalsy();
});

test("type", () => {
  const maybe = optional(string).decode("string");

  if (isRight(maybe)) {
    // @ts-expect-error
    const str: string = maybe.right;

    const optionalStr: string | undefined = maybe.right;

    expect(optionalStr).toBe("string");
  } else {
    fail("it should not be left");
  }
});
