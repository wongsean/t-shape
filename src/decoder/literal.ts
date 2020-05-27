import * as D from "io-ts/lib/Decoder";
import * as G from "io-ts/lib/Guard";

type Literal = string | number | boolean | null | undefined;

export function literal<A extends ReadonlyArray<Literal>>(
  ...values: A
): D.Decoder<A[number]> {
  if (values.length === 0) {
    return D.never;
  }
  const expected = values.map((value) => JSON.stringify(value)).join(" | ");
  return D.fromGuard(literalGuard(...values), expected);
}

export function literalGuard<A extends ReadonlyArray<Literal>>(
  ...values: A
): G.Guard<A[number]> {
  return {
    is: (u: unknown): u is A[number] => values.findIndex((a) => a === u) !== -1,
  };
}
