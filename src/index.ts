import * as D from "io-ts/lib/Decoder";
import { isLeft } from "fp-ts/lib/Either";
import { draw } from "io-ts/lib/Tree";
import { optional } from "./decoder/optional";
import { literal } from "./decoder/literal";
import { ObjectID } from "./decoder/object-id";
import { unknown } from "./decoder/unknown";
import { Enum } from "./decoder/enum";

const Shapeable = {
  Never: D.never,
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
  Intersection: D.intersection,
  Union: D.union,
  Nullable: D.nullable,
  Optional: optional,
  Enum,
  ObjectID,
} as const;

interface ErrorConstructor {
  new (message?: string): Error;
  readonly prototype: Error;
}

export class Shape<T> {
  private constructor(public readonly decoder: D.Decoder<T>) {}

  static make<T>(fn: (s: typeof Shapeable) => D.Decoder<T>) {
    return new Shape(fn(Shapeable));
  }
}

export function assert<T>(
  value: unknown,
  shape: Shape<T>,
  error: ErrorConstructor | Error = TypeError
): asserts value is T {
  const maybe = shape.decoder.decode(value);

  if (isLeft(maybe)) {
    if (error instanceof Error) {
      throw error;
    }
    throw new error(draw(maybe.left));
  }
}
