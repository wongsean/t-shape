import {
  string,
  number,
  parse,
  failure,
  success,
  union,
} from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export const date = pipe(
  union(string, number),
  parse((strOrNum) => {
    const d = new Date(strOrNum);
    return Number.isNaN(d.getTime())
      ? failure(strOrNum, "Loose.Date")
      : success(d);
  })
);
