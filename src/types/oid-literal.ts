import * as T from "io-ts";
import { ObjectId } from "bson";

export interface OidLiteralBrand {
  readonly OidLiteral: unique symbol;
}

export const OidLiteral = T.brand(
  T.string,
  (s): s is T.Branded<string, OidLiteralBrand> => ObjectId.isValid(s),
  "OidLiteral"
);

export type OidLiteral = T.TypeOf<typeof OidLiteral>;
