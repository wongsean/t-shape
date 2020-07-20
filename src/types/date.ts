import {
  string,
  parse,
  failure,
  success,
  union,
  number,
} from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export const date = pipe(
  union(string, number),
  parse((s) => {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? failure(s, "Date") : success(d);
  })
);
