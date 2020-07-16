import * as D from "io-ts/lib/Decoder";
import { literal } from "./literal";

export function optional<A>(
  or: D.Decoder<unknown, A>
): D.Decoder<unknown, A | undefined> {
  return D.union(or, literal(undefined));
}
