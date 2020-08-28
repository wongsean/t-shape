import { Shape } from "../src";

test("constructor and property", () => {
  const s = Shape.make((s) => s.String);

  expect(s.codec).toHaveProperty("decode");
});

test("all types", () => {
  expect(() =>
    Shape.make((s) =>
      s.Struct({
        str: s.String,
        num: s.Number,
        bool: s.Boolean,
        unk: s.Unknown,
        undef: s.Literal(undefined),
        unkMap: s.Map(s.Unknown),
        unkArr: s.Array(s.Unknown),
        int: s.Int,
        oid: s.OidLiteral,
        url: s.UrlLiteral,
        looseDate: s.Loose.Date,
        looseNumber: s.Loose.Number,
        looseBoolean: s.Loose.Boolean,
        interesec: s.Intersect(
          s.Struct({ name: s.String }),
          s.Partial({ age: s.Int })
        ),
        union: s.Union(s.String, s.Number, s.Boolean),
      })
    )
  ).not.toThrowError();
});
