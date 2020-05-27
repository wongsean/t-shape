import { unknown } from "./unknown";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = unknown.decode("123");
  expect(isRight(maybe1)).toBeTruthy();

  const maybe2 = unknown.decode(123);
  expect(isRight(maybe2)).toBeTruthy();

  const maybe3 = unknown.decode(true);
  expect(isRight(maybe3)).toBeTruthy();
});

test("type", () => {
  const maybe = unknown.decode("string");

  if (isRight(maybe)) {
    // cannot pass as string
    // @ts-expect-error
    const str: string = maybe.right;

    // can pass as unknown
    const n: unknown = maybe.right;

    // use them the same way
    expect(n).toBe("string");
  } else {
    fail("it should not be left");
  }
});
