import { number } from "./number";

test("decode", () => {
  const maybe1 = number.safeParse("abc");
  expect(maybe1.success).toBeFalsy();

  const maybe2 = number.safeParse("");
  expect(maybe2.success).toBeFalsy();

  const maybe3 = number.safeParse("123a");
  expect(maybe3.success).toBeFalsy();

  const maybe4 = number.safeParse(123);
  expect(maybe4.success).toBeTruthy();

  const maybe5 = number.safeParse("123");
  expect(maybe5.success).toBeTruthy();

  const maybe6 = number.safeParse(true);
  expect(maybe6.success).toBeFalsy();
});

test("type", () => {
  const maybe = number.safeParse("1213");

  if (maybe.success) {
    // can pass as number
    const n: number = maybe.data;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(n).toStrictEqual(1213);
  } else {
    fail("it should not be left");
  }
});
