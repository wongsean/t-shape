import { Int } from "./int";

test("decode", () => {
  const maybe1 = Int.safeParse("abc");
  expect(maybe1.success).toBeFalsy();

  const maybe2 = Int.safeParse("");
  expect(maybe2.success).toBeFalsy();

  const maybe3 = Int.safeParse("123a");
  expect(maybe3.success).toBeFalsy();

  const maybe4 = Int.safeParse("123");
  expect(maybe4.success).toBeTruthy();

  const maybe5 = Int.safeParse("123.321");
  expect(maybe5.success && maybe5.data === 123).toBeTruthy();

  const maybe6 = Int.safeParse(123.321);
  expect(maybe6.success && maybe6.data === 123).toBeTruthy();

  const maybe7 = Int.safeParse(123);
  expect(maybe7.success).toBeTruthy();
});

test("type", () => {
  const maybe = Int.safeParse(123.321);

  if (maybe.success) {
    // can pass as number
    const num: number = maybe.data;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.right;

    // use them the same way
    expect(num).toBe(123);
  } else {
    fail("it should not be left");
  }
});
