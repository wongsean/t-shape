import { Sharp, assert } from "../src";

test("constructor and property", () => {
  const s = Sharp.make((s) => s.String);

  expect(s.decoder).toHaveProperty("decode");
  expect(s.error).toBe(TypeError);
});

class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

test("error throw", () => {
  const s = Sharp.make((s) => s.String, { throwWith: CustomError });

  expect(s.error).toBe(CustomError);
  expect(() => assert(123, s)).toThrow(CustomError);
});
