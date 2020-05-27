import * as D from "io-ts/lib/Decoder";
import { isLeft } from "fp-ts/lib/Either";
import { draw } from "io-ts/lib/Tree";
import { optional } from "./decoder/optional";
import { literal } from "./decoder/literal";
import { ObjectID } from "./decoder/object-id";

type Sharpable = typeof Sharpable;
const Sharpable = {
  Never: D.never,
  String: D.string,
  Number: D.number,
  Boolean: D.boolean,
  Literal: literal,
  Type: D.type,
  Partial: D.partial,
  Record: D.record,
  Array: D.array,
  Tuple: D.tuple,
  Intersection: D.intersection,
  Union: D.union,
  Nullable: D.nullable,
  Optional: optional,
  ObjectID,
};

interface ErrorConstructor {
  new (message?: string): Error;
  readonly prototype: Error;
}

export class Sharp<T> {
  private constructor(public readonly decoder: D.Decoder<T>) {}

  static make<T>(fn: (s: Sharpable) => D.Decoder<T>) {
    return new Sharp(fn(Sharpable));
  }
}

export function assert<T>(
  value: unknown,
  sharp: Sharp<T>,
  error: ErrorConstructor | Error = TypeError
): asserts value is T {
  const maybe = sharp.decoder.decode(value);

  if (isLeft(maybe)) {
    if (error instanceof Error) {
      throw error;
    }
    throw new error(draw(maybe.left));
  }
}
