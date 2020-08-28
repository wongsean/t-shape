import { Shape } from "../src";

test("simple example", () => {
  const RequestBody = Shape.make((s) =>
    s.Struct({
      id: s.String,
    })
  );

  expect(() => {
    RequestBody.coerce({ id: "1" });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: 1 });
  }).toThrow(TypeError);
});

test("type casting", () => {
  const RequestBody = Shape.make((s) =>
    s.Struct({
      time: s.Loose.Date,
    })
  );

  expect(RequestBody.coerce({ time: "2020-01-01" })).toStrictEqual({
    time: new Date("2020-01-01"),
  });
});

test("optional field", () => {
  const RequestBody = Shape.make((s) =>
    s.Intersect(
      s.Struct({
        id: s.String,
      }),
      s.Partial({
        liked: s.Boolean,
      })
    )
  );

  expect(() => {
    RequestBody.coerce({ id: "1" });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: "1", liked: true });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: 1 });
  }).toThrow(TypeError);

  expect(() => {
    RequestBody.coerce({ id: "1", liked: "true" });
  }).toThrow(TypeError);
});

test("optional field another way", () => {
  const RequestBody = Shape.make((s) =>
    s.Struct({
      id: s.String,
      liked: s.Optional(s.Boolean),
    })
  );

  expect(() => {
    RequestBody.coerce({ id: "1" });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: "1", liked: true });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: 1 });
  }).toThrow(TypeError);

  expect(() => {
    RequestBody.coerce({ id: "1", liked: "true" });
  }).toThrow(TypeError);
});

test("nullable field", () => {
  const RequestBody = Shape.make((s) =>
    s.Struct({
      id: s.String,
      author: s.Nullable(s.String),
    })
  );

  expect(() => {
    RequestBody.coerce({ id: "1", author: "2" });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: "1", author: null });
  }).not.toThrowError();

  expect(() => {
    RequestBody.coerce({ id: "1", author: 2 });
  }).toThrow(TypeError);

  expect(() => {
    RequestBody.coerce({ id: "1" });
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
  const s = Shape.make((s) => s.String);

  expect(() => s.coerce(123, CustomError)).toThrow(CustomError);
  expect(() => s.coerce(123, new CustomError())).toThrow(CustomError);
});
