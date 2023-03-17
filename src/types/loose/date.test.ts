import { date } from "./date";

test("decode", () => {
  const maybe1 = date.safeParse("abc");
  expect(maybe1.success).toBeFalsy();

  const maybe2 = date.safeParse("");
  expect(maybe2.success).toBeFalsy();

  const maybe3 = date.safeParse(123);
  expect(maybe3.success).toBeTruthy();

  const maybe4 = date.safeParse("2012-01-01");
  expect(maybe4.success).toBeTruthy();
});

test("type", () => {
  const maybe = date.safeParse("2020-01-01");

  if (maybe.success) {
    // can pass as Date
    const d: Date = maybe.data;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.data;

    // use them the same way
    expect(d).toStrictEqual(new Date("2020-01-01"));
  } else {
    fail("it should not be failed");
  }
});
