import { Shape } from "../src";

function passBody(body: { id: string }) {
  return body;
}

test("type assertion", () => {
  const a: unknown = "a";
  const s = Shape.make((s) => s.Struct({ id: s.String }));

  expect(() => {
    // cannot pass before assert
    // @ts-expect-error
    passBody(a);

    // can pass after coerce
    const body = s.coerce(a);
    passBody(body);
  }).toThrow(TypeError);
});
