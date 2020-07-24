import { date } from "./date";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = date.decode("abc");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = date.decode("");
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = date.decode(123);
  expect(isRight(maybe3)).toBeTruthy();

  const maybe4 = date.decode("2012-01-01");
  expect(isRight(maybe4)).toBeTruthy();
});

test("type", () => {
  const maybe = date.decode("2020-01-01");

  if (isRight(maybe)) {
    // can pass as Date
    const d: Date = maybe.right;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(d).toStrictEqual(new Date("2020-01-01"));
  } else {
    fail("it should not be left");
  }

  const maybe2 = date.decode(undefined);
  expect(isRight(maybe2)).toBeFalsy();
});
