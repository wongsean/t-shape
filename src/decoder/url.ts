import * as D from "io-ts/lib/Decoder";
import { URL } from "url";

export interface UrlBrand {
  readonly Url: unique symbol;
}

export type Url = string & UrlBrand;

export const Url: D.Decoder<Url> = D.refinement(
  D.string,
  (s): s is Url => isURL(s),
  "Url"
);

function isURL(s: string): s is Url {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}
