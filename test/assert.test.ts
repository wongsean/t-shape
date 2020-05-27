import { Sharp, assert } from "../source";

test("simple example", () => {
  const RequestBody = Sharp.make((s) =>
    s.Type({
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
      s.Type({
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
    s.Type({
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
    s.Type({
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
