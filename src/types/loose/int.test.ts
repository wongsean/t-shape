import { Int } from "./int";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = Int.decode("abc");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = Int.decode("");
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = Int.decode("123a");
  expect(isRight(maybe3)).toBeFalsy();

  const maybe4 = Int.decode("123");
  expect(isRight(maybe4)).toBeTruthy();

  const maybe5 = Int.decode("123.321");
  expect(isRight(maybe5) && maybe5.right === 123).toBeTruthy();

  const maybe6 = Int.decode(123.321);
  expect(isRight(maybe6) && maybe6.right === 123).toBeTruthy();

  const maybe7 = Int.decode(123);
  expect(isRight(maybe7)).toBeTruthy();
});

test("type", () => {
  const maybe = Int.decode(123.321);

  if (isRight(maybe)) {
    // can pass as number
    const num: number = maybe.right;

    // can pass as Int
    const int: Int = maybe.right;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(num).toBe(123);
    expect(int).toBe(123);
  } else {
    fail("it should not be left");
  }
});
