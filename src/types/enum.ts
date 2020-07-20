import * as T from "io-ts";

export function Enum<A>(name: string, e: Record<string, A>): T.Type<A>;
export function Enum<A>(
  name: string,
  e: Record<string, string | number>
): T.Type<A>;
export function Enum<A>(name: string, e: Record<string, A>): T.Type<A> {
  const is = (u: unknown): u is A =>
    Object.keys(e)
      .map((key) => e[key])
      .findIndex((a) => a === u) !== -1;

  return new T.Type<A>(
    name,
    is,
    (u, c) => (is(u) ? T.success(u) : T.failure(u, c)),
    (a) => a
  );
}
