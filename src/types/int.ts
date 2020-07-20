import { number, refine } from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export interface IntBrand {
  readonly Int: unique symbol;
}

export type Int = number & IntBrand;

export const Int = pipe(
  number,
  refine((s): s is Int => Number.isInteger(s), "Int")
);
