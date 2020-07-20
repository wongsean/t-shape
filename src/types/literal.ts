import * as T from "io-ts";

type Literal = string | number | boolean | null | undefined;

export function literal<A extends [Literal, ...Literal[]]>(
  ...values: A
): T.Type<A[number]> {
  const expected = values.map((value) => JSON.stringify(value)).join(" | ");
  const is = (u: unknown): u is A[number] =>
    values.findIndex((a) => a === u) !== -1;
  return new T.Type<A[number], A[number]>(
    expected,
    is,
    (u, c) => (is(u) ? T.success(u) : T.failure(u, c)),
    (a) => a
  );
}
