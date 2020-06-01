import { Url } from "./url";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = Url.decode("123");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = Url.decode(123);
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = Url.decode("https://github.com/wongsean");
  expect(isRight(maybe3)).toBeTruthy();
});

test("type", () => {
  const maybe = Url.decode("https://github.com/wongsean");

  if (isRight(maybe)) {
    // can pass as string
    const str: string = maybe.right;

    // can pass as Url
    const url: Url = maybe.right;

    // cannot pass as other type like number
    // @ts-expect-error
    const n: number = maybe.right;

    // use them the same way
    expect(str).toBe("https://github.com/wongsean");
    expect(url).toBe("https://github.com/wongsean");
  } else {
    fail("it should not be left");
  }
});
