import { OidLiteral } from "./oid-literal";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = OidLiteral.decode("123");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = OidLiteral.decode(123);
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = OidLiteral.decode("5e280bc25a851cbc51be07e4");
  expect(isRight(maybe3)).toBeTruthy();
});

test("type", () => {
  const maybe = OidLiteral.decode("5e280bc25a851cbc51be07e4");

  if (isRight(maybe)) {
    // can pass as string
    const str: string = maybe.right;

    // can pass as OidLiteral
    const objectId: OidLiteral = maybe.right;

    // cannot pass as other type like number
    // @ts-expect-error
    const n: number = maybe.right;

    // use them the same way
    expect(str).toBe("5e280bc25a851cbc51be07e4");
    expect(objectId).toBe("5e280bc25a851cbc51be07e4");
  } else {
    fail("it should not be left");
  }
});
