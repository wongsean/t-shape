import { string, refine } from "io-ts/lib/Decoder";
import { URL } from "url";
import { pipe } from "fp-ts/lib/function";

export interface UrlLiteralBrand {
  readonly UrlLiteral: unique symbol;
}

export type UrlLiteral = string & UrlLiteralBrand;

function is(s: string): s is UrlLiteral {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

export const UrlLiteral = pipe(string, refine(is, "UrlLiteral"));
