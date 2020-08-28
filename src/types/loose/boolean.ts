import {
  string,
  boolean as basicBoolean,
  parse,
  failure,
  success,
  union,
} from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export const boolean = pipe(
  union(string, basicBoolean),
  parse((strOrBool) => {
    if (typeof strOrBool === "boolean") {
      return success(strOrBool);
    }

    if (strOrBool.trim() === "true") {
      return success(true);
    }

    if (strOrBool.trim() === "false") {
      return success(false);
    }

    return failure(strOrBool, "Loose.Boolean");
  })
);
