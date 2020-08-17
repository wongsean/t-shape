import * as D from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";
import { right, left, chain } from "fp-ts/lib/Either";

export function constrain<A>(
  decoder: D.Decoder<unknown, A>,
  constraint: (value: A) => boolean,
  id: string
): D.Decoder<unknown, A> {
  return pipe(decoder, (from) => ({
    decode: (i) =>
      pipe(
        from.decode(i),
        chain((i) => (constraint(i) ? right(i) : left(D.error(i, id))))
      ),
  }));
}
