import { literal } from "./literal";
import { Decoder, union } from "io-ts/lib/Decoder";

export function optional<A>(
  or: Decoder<unknown, A>
): Decoder<unknown, A | undefined> {
  return union(or, literal(undefined));
}
