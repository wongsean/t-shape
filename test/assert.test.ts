import { Sharp, assert } from "../src";

test("simple example", () => {
  const RequestBody = Sharp.make((s) =>
    s.Struct({
      id: s.String,
    })
  );

  expect(() => {
    assert({ id: "1" }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: 1 }, RequestBody);
  }).toThrow(TypeError);
});

test("optional field", () => {
  const RequestBody = Sharp.make((s) =>
    s.Intersection(
      s.Struct({
        id: s.String,
      }),
      s.Partial({
        liked: s.Boolean,
      })
    )
  );

  expect(() => {
    assert({ id: "1" }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: "1", liked: true }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: 1 }, RequestBody);
  }).toThrow(TypeError);

  expect(() => {
    assert({ id: "1", liked: "true" }, RequestBody);
  }).toThrow(TypeError);
});

test("optional field another way", () => {
  const RequestBody = Sharp.make((s) =>
    s.Struct({
      id: s.String,
      liked: s.Optional(s.Boolean),
    })
  );

  expect(() => {
    assert({ id: "1" }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: "1", liked: true }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: 1 }, RequestBody);
  }).toThrow(TypeError);

  expect(() => {
    assert({ id: "1", liked: "true" }, RequestBody);
  }).toThrow(TypeError);
});

test("nullable field", () => {
  const RequestBody = Sharp.make((s) =>
    s.Struct({
      id: s.String,
      author: s.Nullable(s.String),
    })
  );

  expect(() => {
    assert({ id: "1", author: "2" }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: "1", author: null }, RequestBody);
  }).not.toThrowError();

  expect(() => {
    assert({ id: "1", author: 2 }, RequestBody);
  }).toThrow(TypeError);

  expect(() => {
    assert({ id: "1" }, RequestBody);
  }).toThrow(TypeError);
});

class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

test("error throw", () => {
  const s = Sharp.make((s) => s.String);

  expect(() => assert(123, s, CustomError)).toThrow(CustomError);
  expect(() => assert(123, s, new CustomError())).toThrow(CustomError);
});
