import { literal } from "../literal";
import { Decoder, union, parse, success } from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export function optional<A>(
  or: Decoder<unknown, A>
): Decoder<unknown, A | undefined> {
  return pipe(
    union(or, literal(undefined), literal(null)),
    parse((value) => {
      if (value === null) {
        return success(undefined);
      }

      return success(value);
    })
  );
}
