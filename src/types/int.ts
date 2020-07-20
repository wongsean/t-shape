import * as T from "io-ts";

export interface IntBrand {
  readonly Int: unique symbol;
}

export const Int = T.brand(
  T.number,
  (s): s is T.Branded<number, IntBrand> => Number.isInteger(s),
  "Int"
);

export type Int = T.TypeOf<typeof Int>;
