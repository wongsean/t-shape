import * as D from "io-ts/lib/Decoder";
import { isLeft } from "fp-ts/lib/Either";
import { OidLiteral } from "./types/oid-literal";
import { UrlLiteral } from "./types/url-literal";
import { Int } from "./types/int";
import { Enum } from "./types/enum";
import { optional } from "./types/optional";
import { literal } from "./types/literal";
import { unknown } from "./types/unknown";
import { date } from "./types/date";
import { constrain } from "./constrain";

const Shapeable = {
  String: D.string,
  Number: D.number,
  Boolean: D.boolean,
  Unknown: unknown,
  Literal: literal,
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
  Date: date,
  Constrain: constrain,
} as const;

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
