import * as T from "io-ts";
import { literal } from "./literal";

export function optional<A>(or: T.Type<A>): T.Type<A | undefined> {
  return T.union([or, literal(undefined)]);
}
