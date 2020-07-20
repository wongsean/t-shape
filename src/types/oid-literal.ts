import { ObjectId } from "bson";
import { refine, string } from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/function";

export interface OidLiteralBrand {
  readonly OidLiteral: unique symbol;
}

export type OidLiteral = string & OidLiteralBrand;

export const OidLiteral = pipe(
  string,
  refine((s): s is OidLiteral => ObjectId.isValid(s), "OidLiteral")
);
