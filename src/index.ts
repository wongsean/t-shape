import * as T from "io-ts";
import reporter from "io-ts-reporters";
import { isLeft } from "fp-ts/lib/Either";
import { optional } from "./types/optional";
import { literal } from "./types/literal";
import { OidLiteral } from "./types/oid-literal";
import { UrlLiteral } from "./types/url-literal";
import { Enum } from "./types/enum";
import { Int } from "./types/int";

const Shapeable = {
  String: T.string,
  Number: T.number,
  Boolean: T.boolean,
  Unknown: T.unknown,
  Literal: literal,
  Struct: T.type,
  Partial: T.partial,
  Map: <A>(a: T.Type<A>) => T.record(T.string, a),
  Array: T.array,
  Tuple: T.tuple,
  Intersect: <A, B>(a: T.Type<A>, b: T.Type<B>) => T.intersection([a, b]),
  Union: T.union,
  Optional: optional,
  Enum,
  OidLiteral,
  UrlLiteral,
  Int,
} as const;

interface ErrorConstructor {
  new (message?: string): Error;
  readonly prototype: Error;
}

export class Shape<T> {
  private constructor(public readonly codec: T.Type<T>) {}

  static make<T>(fn: (s: typeof Shapeable) => T.Type<T>) {
    return new Shape(fn(Shapeable));
  }
}

export namespace Shape {
  export function assert<T>(
    value: unknown,
    shape: Shape<T>,
    error: ErrorConstructor | Error = TypeError
  ): asserts value is T {
    const maybe = shape.codec.decode(value);

    if (isLeft(maybe)) {
      if (error instanceof Error) {
        throw error;
      }
      throw new error(reporter.report(maybe).join("\n"));
    }
  }
}

export function assert<T>(
  value: unknown,
  shape: Shape<T>,
  error: ErrorConstructor | Error = TypeError
): asserts value is T {
  Shape.assert(value, shape, error);
}
