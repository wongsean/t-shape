import { number } from "./number";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = number.decode("abc");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = number.decode("");
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = number.decode("123a");
  expect(isRight(maybe3)).toBeFalsy();

  const maybe4 = number.decode(123);
  expect(isRight(maybe4)).toBeTruthy();

  const maybe5 = number.decode("123");
  expect(isRight(maybe5)).toBeTruthy();

  const maybe6 = number.decode(true);
  expect(isRight(maybe6)).toBeFalsy();
});

test("type", () => {
  const maybe = number.decode("1213");

  if (isRight(maybe)) {
    // can pass as number
    const n: number = maybe.right;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(n).toStrictEqual(1213);
  } else {
    fail("it should not be left");
  }
});
