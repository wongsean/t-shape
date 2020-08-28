Protects your typescript code world from unknown outside input.

```ts
const Body = Shape.make((s) =>
  s.Struct({
    name: s.Constrain(s.String, (s) => s.length < 10, "Nickname"),
    age: s.Int, // a refined number
    gender: s.Enum("Gender", Gender),
    birth: s.Loose.Date, // casting string to date
  })
);

// a koa router with json bodyparser
router.post("/profiles", async (ctx) => {
  const profile = Body.corece(ctx.request.body);
  // profile is validated and has type
  // {
  //   name: string
  //   age: Int
  //   gender: Gender
  //   birth: Date
  // }

  const user = await create(profile);

  ctx.body = user;
});
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
  - [Define a shape](#define-a-shape)
    - [Primitive](#primitive)
    - [Combinators](#combinators)
      - [The `s.Literal` constructor](#the-sliteral-constructor)
      - [The `s.Optional` constructor](#the-soptional-constructor)
      - [The `s.Struct` constructor](#the-sstruct-constructor)
      - [The `s.Partial` constructor](#the-spartial-constructor)
      - [The `s.Map` constructor](#the-smap-constructor)
      - [The `s.Array` constructor](#the-sarray-constructor)
      - [The `s.Tuple` constructor](#the-stuple-constructor)
      - [The `s.Intersect` constructor](#the-sintersect-constructor)
      - [The `s.Union` constructor](#the-sunion-constructor)
      - [The `s.Enum` constructor](#the-senum-constructor)
      - [The `s.Constrain` constructor](#the-sconstrain-constructor)
    - [Brand](#brand)
      - [The `s.OidLiteral` type](#the-soidliteral-type)
      - [The `s.UrlLiteral` type](#the-surlliteral-type)
      - [The `s.Int` type](#the-sint-type)
    - [Loose Type](#loose-type)
      - [The `s.Loose.Date` type](#the-sloosedate-type)
      - [The `s.Loose.Number` type](#the-sloosenumber-type)
      - [The `s.Loose.Boolean` type](#the-slooseboolean-type)
  - [Coericion](#coericion)
- [Roadmap](#roadmap)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

`npm i t-shape`

# Usage

## Define a shape

```ts
const shape = Shape.make((s) =>
  s.Struct({
    id: s.OidLiteral,
    name: s.String,
    age: s.Optional(s.Number)
    address: s.Array(s.String)
  })
)

// stands for type => {
//   id: OidLiteral // string with objectId constraint
//   name: string
//   age: number | undefined
//   address: string[]
// }
```

### Primitive

- `s.Never`
- `s.String`
- `s.Number`
- `s.Boolean`
- `s.Unknown`

### Combinators

#### The `s.Literal` constructor

- `s.Literal(null)` => `null`
- `s.Literal(undefined)` => `undefined`
- `s.Literal('ON')` => `'ON'`
- `s.Literal('ON', 'OFF')` => `'ON' | 'OFF'`

#### The `s.Optional` constructor

`s.Optional(s.String)` => `string | undefined`

Notice that it DOES NOT mean the key is optional (`key?: string`)

#### The `s.Struct` constructor

`s.Struct({ id: s.String, time: s.Number })` => `{ id: string, time: number }`

#### The `s.Partial` constructor

`s.Partial({ id: s.String, time: s.Number })` => `{ id?: string, time?: number }`

#### The `s.Map` constructor

`s.Map(s.Boolean)` => `Record<string, boolean>`

#### The `s.Array` constructor

`s.Array(s.Number)` => `number[]`

#### The `s.Tuple` constructor

`s.Tuple(s.String, s.Number)` => `[string, number]`

#### The `s.Intersect` constructor

`s.Intersect(s.Struct({ name: s.String }), s.Partial({ age: s.Number }))` => `{ name: string } & { age?: number }`

#### The `s.Union` constructor

`s.Union(s.String, s.Number)` => `string | number`

#### The `s.Enum` constructor

To compatible with Typescript enum when there is no other choice, it's not well supported due to a poor design, highly recommend using `s.Literal` instead.

```ts
// MUST NOT be a `const enum`, otherwise it will be optimized out.
enum Toggle {
  On = "ON",
  Off = "OFF",
}

s.Enum("Toggle", Toggle); // => Toggle

// You have to specify enum type when it's a numeric enum,
// however numeric enums are unsafe in typescript, shouldn't be used anyway.
// @see https://github.com/gcanti/io-ts/issues/216#issuecomment-621615906
enum ToggleNumber {
  On,
  Off,
}

s.Enum<ToggleNumber>("ToggleNumber", ToggleNumber); // => ToggleNumber
```

#### The `s.Constrain` constructor

`s.Constrain(s.Number, n => n > 0, 'Positive')` => `number (with positive constraint)`

To add additional constraint to a type.

### Brand

#### The `s.OidLiteral` type

the `s.OidLiteral` is string with ObjectID constraint, it uses `ObjectId.valid(i)`.

#### The `s.UrlLiteral` type

- the `s.UrlLiteral` is string with Url constraint, it uses `new URL(i)` to validate.

#### The `s.Int` type

- the `s.Int` is number with Integer constraint, it uses `Number.isInteger(i)`.

### Loose Type

#### The `s.Loose.Date` type

the `s.Loose.Date` will cast string/number to Date, by using `new Date(i)`

#### The `s.Loose.Number` type

the `s.Loose.Number` will cast string/number to number, cases:

- `123` -> `123`
- `NaN` -> throw error
- `"123"` -> throw error
- `"123abc"` -> throw error
- `""` -> throw error

#### The `s.Loose.Boolean` type

the `s.Loose.Boolean` will cast string/boolean to boolean, cases:

- `true` -> `true`
- `"false"` -> `false`
- `"1"` -> throw error
- `"yes"` -> throw error

## Coericion

Say we are using koa(with body-parser), to coerce body shape you can

```ts
import { Shape } from "t-shape";
import { Errors } from "./errors";

const Body = Shape.make((s) =>
  S.Struct({ id: s.OidLiteral, text: s.String, time: s.Date })
);

async function handler(ctx: Context) {
  // with type { id: OidLiteral, text: string, time: Date }
  const { id, text, time } = Body.coerce(
    ctx.request.body,
    new Errors.InvalidParams()
  );
}
```

The third argument can receive a `Error | ErrorContructor`, the Error instance will be threw directly while the ErrorContructor will receive error message as first argument.
By default it's `TypeError` constructor.

# Roadmap

- Add branded type such as Positive(number), Email(string), etc.
