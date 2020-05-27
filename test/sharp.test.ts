import { Sharp } from "../src";

test("constructor and property", () => {
  const s = Sharp.make((s) => s.Type({ id: s.String }));

  expect(s.decoder).toHaveProperty("decode");
  expect(s.error).toBe(TypeError);
});
