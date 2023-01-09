import * as D from "io-ts/lib/Decoder";
import { isLeft } from "fp-ts/lib/Either";

import * as L from "./types/loose";
import { OidLiteral } from "./types/oid-literal";
import { UrlLiteral } from "./types/url-literal";
import { Int } from "./types/int";
import { Enum } from "./types/enum";
import { optional } from "./types/optional";
import { literal as Literal } from "./types/literal";
import { unknown } from "./types/unknown";
import { constrain } from "./constrain";

const Shapeable = {
  String: D.string,
  Number: D.number,
  Boolean: D.boolean,
  Unknown: unknown,
  Literal,
  Struct: D.type,
  Partial: D.partial,
  Map: D.record,
  Array: D.array,
  Tuple: D.tuple,
  Intersect: <A, B>(a: D.Decoder<unknown, A>, b: D.Decoder<unknown, B>) =>
    D.intersect(a)(b),
  Union: D.union,
  Nullable: D.nullable,
  Optional: optional,
  Enum,
  OidLiteral,
  UrlLiteral,
  Int,
  Constrain: constrain,
  Loose: {
    Date: L.date,
    Number: L.number,
    Boolean: L.boolean,
    Optional: L.optional,
    Int: L.Int,
  },
  Shape: <T>(s: Shape<T>) => s.codec,
};

interface ErrorConstructor {
  new (message?: string): Error;
  readonly prototype: Error;
}

export class Shape<T> {
  private constructor(public readonly codec: D.Decoder<unknown, T>) {}

  static make<T>(fn: (s: typeof Shapeable) => D.Decoder<unknown, T>) {
    return new Shape(fn(Shapeable));
  }

  coerce(value: unknown, error: ErrorConstructor | Error = TypeError): T {
    const maybe = this.codec.decode(value);

    if (isLeft(maybe)) {
      if (error instanceof Error) {
        throw error;
      }
      throw new error(D.draw(maybe.left));
    }

    return maybe.right;
  }
}

export type Static<T extends Shape<unknown>> = T extends Shape<infer A>
  ? A
  : never;
