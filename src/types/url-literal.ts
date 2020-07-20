import * as T from "io-ts";
import { URL } from "url";

export interface UrlLiteralBrand {
  readonly UrlLiteral: unique symbol;
}

function is(s: string): s is T.Branded<string, UrlLiteralBrand> {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

export const UrlLiteral = T.brand(T.string, is, "UrlLiteral");

export type UrlLiteral = T.TypeOf<typeof UrlLiteral>;
