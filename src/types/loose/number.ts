import {
  string,
  number as basicNumber,
  parse,
  failure,
  success,
  union,
} from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export const number = pipe(
  union(string, basicNumber),
  parse((strOrNum) => {
    const n = new Number(strOrNum).valueOf();

    // handle blank string
    if (n === 0 && typeof strOrNum === "string" && !strOrNum.trim()) {
      return failure(n, "Loose.Number");
    }
    return Number.isNaN(n) ? failure(strOrNum, "Loose.Number") : success(n);
  })
);
