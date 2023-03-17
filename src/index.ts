import * as L from "./types/loose";

import { literal as Literal } from "./types/literal";

import { EnumLike, z, ZodRawShape, ZodType, ZodTypeAny } from "zod";

const Shapeable = {
  String: z.string(),
  Number: z.number(),
  Boolean: z.boolean(),
  Unknown: z.unknown(),
  Literal,
  Struct: z.object,
  Partial: <T extends ZodRawShape>(o: T) => z.object(o).partial(),
  Map: z.record,
  Array: z.array,
  Tuple: <T extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(...args: T) =>
    z.tuple(args),
  Intersect: z.intersection,
  Union: <T extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(
    ...args: T
  ) => z.union(args),
  Nullable: z.nullable,
  Optional: z.optional,
  Enum: <T extends EnumLike>(_name: string, value: T) => z.nativeEnum(value),
  OidLiteral: z.string().regex(/^[0-9a-fA-F]{24}$/),
  UrlLiteral: z.string().url(),
  Int: z.number().int(),
  Constrain: <
    Output extends any,
    T extends ZodType<Output>,
    RefinedOutput extends Output
  >(
    t: T,
    check: (arg: Output) => arg is RefinedOutput,
    message?: string
  ) => t.refine(check, message),
  Loose: {
    Date: L.date,
    Number: L.number,
    Boolean: L.boolean,
    Optional: <T extends ZodTypeAny>(t: T) => t.nullish(),
    Int: L.Int,
  },
  Shape: <T extends ZodTypeAny>(s: Shape<T>) => s.codec,
};

interface ErrorConstructor {
  new (message?: string): Error;
  readonly prototype: Error;
}

export class Shape<T extends ZodTypeAny = ZodTypeAny> {
  private constructor(public readonly codec: T) {}

  static make<T extends ZodTypeAny>(fn: (z: typeof Shapeable) => T) {
    return new Shape(fn(Shapeable));
  }

  coerce(value: unknown, error?: ErrorConstructor | Error): z.infer<T> {
    const result = this.codec.safeParse(value);

    if (!result.success) {
      if (error instanceof Error) {
        throw error;
      }
      if (error) {
        throw new error(result.error.message);
      }
      throw result.error;
    }

    return result.data;
  }
}

export type Static<S extends Shape> = S extends Shape<infer T>
  ? z.infer<T>
  : never;

export { ZodError } from "zod";
