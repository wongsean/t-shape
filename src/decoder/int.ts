import { pipe } from "fp-ts/lib/pipeable";
import * as D from "io-ts/lib/Decoder";

export interface IntBrand {
  readonly Int: unique symbol;
}

export type Int = number & IntBrand;

export const Int: D.Decoder<unknown, Int> = pipe(
  D.number,
  D.refine((s): s is Int => Number.isInteger(s), "Int")
);
