import { boolean } from "./boolean";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = boolean.decode("abc");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = boolean.decode("");
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = boolean.decode(123);
  expect(isRight(maybe3)).toBeFalsy();

  const maybe4 = boolean.decode(true);
  expect(isRight(maybe4)).toBeTruthy();

  const maybe5 = boolean.decode("true");
  expect(isRight(maybe5)).toBeTruthy();
});

test("type", () => {
  const maybe = boolean.decode("true");

  if (isRight(maybe)) {
    // can pass as boolean
    const b: boolean = maybe.right;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(b).toStrictEqual(true);
  } else {
    fail("it should not be left");
  }
});
