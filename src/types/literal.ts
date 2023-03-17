import { Primitive, z, ZodLiteral, ZodUnion } from "zod";

export function literal<A extends Primitive>(value: A): ZodLiteral<A>;
export function literal<
  A extends readonly [Primitive, Primitive, ...Primitive[]]
>(...values: A): ZodUnion<{ -readonly [K in keyof A]: ZodLiteral<A[K]> }>;
export function literal<A extends [Primitive, ...Primitive[]]>(...values: A) {
  const [first, second, ...others] = values;
  if (!second) {
    return z.literal(first);
  } else {
    return z.union([
      z.literal(first),
      z.literal(second),
      ...others.map((l) => z.literal(l)),
    ]) as ZodUnion<{ -readonly [K in keyof A]: ZodLiteral<A[K]> }>;
  }
}
