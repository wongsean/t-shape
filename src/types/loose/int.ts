import { parse, success } from "io-ts/lib/Decoder";
import { number } from "./number";
import { pipe } from "fp-ts/lib/function";

import type { IntBrand } from "../int";

export type Int = number & IntBrand;

export const Int = pipe(
  number,
  parse((n) => success(Math.trunc(n) as Int))
);
