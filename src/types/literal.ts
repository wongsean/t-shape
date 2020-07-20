import { Decoder, fromGuard } from "io-ts/lib/Decoder";
import { Guard } from "io-ts/lib/Guard";

type Literal = string | number | boolean | null | undefined;

export function literalGuard<A extends [Literal, ...Literal[]]>(
  ...values: A
): Guard<unknown, A[number]> {
  return {
    is: (u: unknown): u is A[number] => values.findIndex((a) => a === u) !== -1,
  };
}

export function literal<A extends [Literal, ...Literal[]]>(
  ...values: A
): Decoder<unknown, A[number]> {
  const expected = values.map((value) => JSON.stringify(value)).join(" | ");
  return fromGuard(literalGuard(...values), expected);
}
