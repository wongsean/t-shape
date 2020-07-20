import { Guard } from "io-ts/lib/Guard";
import { fromGuard, Decoder } from "io-ts/lib/Decoder";

function enumGuard<A>(e: Record<string, A>): Guard<unknown, A> {
  return {
    is: (u): u is A =>
      Object.keys(e)
        .map((key) => e[key])
        .findIndex((a) => a === u) !== -1,
  };
}

export function Enum<A>(
  name: string,
  e: Record<string, A>
): Decoder<unknown, A>;
export function Enum<A>(
  name: string,
  e: Record<string, string | number>
): Decoder<unknown, A>;
export function Enum<A>(
  name: string,
  e: Record<string, A>
): Decoder<unknown, A> {
  return fromGuard(enumGuard(e), name);
}
