import { Enum } from "./enum";
import { isRight } from "fp-ts/lib/Either";

enum Toggle {
  On = "ON",
  Off = "OFF",
}

test("decode", () => {
  const maybe1 = Enum("Toggle", Toggle).decode("s");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = Enum("Toggle", Toggle).decode("ON");
  expect(isRight(maybe2)).toBeTruthy();

  const maybe3 = Enum("Toggle", Toggle).decode("On");
  expect(isRight(maybe3)).toBeFalsy();
});

test("type", () => {
  const maybe = Enum("Toggle", Toggle).decode("ON");

  if (isRight(maybe)) {
    // can pass as enum
    const t: Toggle = maybe.right;

    // can pass as the value type (string | number)
    const ts: string | number = maybe.right;

    // cannot pass as other type
    // @ts-expect-error
    const b: boolean = maybe.right;

    // use them the same way
    expect(t).toBe("ON");
    expect(ts).toBe("ON");
  } else {
    fail("it should not be left");
  }
});
