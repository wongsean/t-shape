import * as D from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/pipeable";
import { URL } from "url";

export interface UrlBrand {
  readonly Url: unique symbol;
}

export type Url = string & UrlBrand;

export const Url: D.Decoder<unknown, Url> = pipe(
  D.string,
  D.refine((s): s is Url => isURL(s), "Url")
);

function isURL(s: string): s is Url {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}
