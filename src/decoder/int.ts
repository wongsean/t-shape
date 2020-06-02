import * as D from "io-ts/lib/Decoder";

export interface IntBrand {
  readonly Int: unique symbol;
}

export type Int = number & IntBrand;

export const Int: D.Decoder<Int> = D.refinement(
  D.number,
  (s): s is Int => Number.isInteger(s),
  "Int"
);
