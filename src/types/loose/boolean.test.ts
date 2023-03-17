import { boolean } from "./boolean";

test("decode", () => {
  const maybe1 = boolean.safeParse("abc");
  expect(maybe1.success).toBeFalsy();

  const maybe2 = boolean.safeParse("");
  expect(maybe2.success).toBeFalsy();

  const maybe3 = boolean.safeParse(123);
  expect(maybe3.success).toBeFalsy();

  const maybe4 = boolean.safeParse(true);
  expect(maybe4.success).toBeTruthy();

  const maybe5 = boolean.safeParse("true");
  expect(maybe5.success).toBeTruthy();
});

test("type", () => {
  const maybe = boolean.safeParse("true");

  if (maybe.success) {
    // can pass as boolean
    const b: boolean = maybe.data;

    // cannot pass as other type like string
    // @ts-expect-error
    const s: string = maybe.data;

    // use them the same way
    expect(b).toStrictEqual(true);
  } else {
    fail("it should not be failed");
  }
});
