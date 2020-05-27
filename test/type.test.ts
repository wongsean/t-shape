import { assert, Sharp } from "../src";

function passBody(body: { id: string }) {
  return body;
}

test("type assertion", () => {
  const a: unknown = "a";
  const s = Sharp.make((s) => s.Type({ id: s.String }));

  expect(() => {
    // cannot pass before assert
    // @ts-expect-error
    passBody(a);

    // assert type here
    assert(a, s);

    // can pass after assert
    passBody(a);
  }).toThrow(TypeError);
});
