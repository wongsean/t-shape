import { Sharp } from "../src";

test("constructor and property", () => {
  const s = Sharp.make((s) => s.String);

  expect(s.decoder).toHaveProperty("decode");
});
