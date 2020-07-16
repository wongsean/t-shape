import * as D from "io-ts/lib/Decoder";
import * as G from "io-ts/lib/Guard";

export function enumGuard<A>(e: Record<string, A>): G.Guard<unknown, A> {
  return {
    is: (u: unknown): u is A =>
      Object.keys(e)
        .map((key) => e[key])
        .findIndex((a) => a === u) !== -1,
  };
}

export function Enum<A>(
  name: string,
  e: Record<string, A>
): D.Decoder<unknown, A>;
export function Enum<A>(
  name: string,
  e: Record<string, string | number>
): D.Decoder<unknown, A>;
export function Enum<A>(
  name: string,
  e: Record<string, A>
): D.Decoder<unknown, A> {
  return D.fromGuard(enumGuard(e), name);
}
