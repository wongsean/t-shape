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
    - [Brand](#brand)
  - [Assertion](#assertion)
- [Roadmap](#roadmap)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

`npm i t-shape`

## Usage

### Define a shape

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

#### Primitive

- `s.Never`
- `s.String`
- `s.Number`
- `s.Boolean`
- `s.Unknown`

#### Combinators

##### The `s.Literal` constructor

- `s.Literal(null)` => `null`
- `s.Literal(undefined)` => `undefined`
- `s.Literal('ON')` => `'ON'`
- `s.Literal('ON', 'OFF')` => `'ON' | 'OFF'`

##### The `s.Optional` constructor

`s.Optional(s.String)` => `string | undefined`

Notice that it DOES NOT mean the key is optional (`key?: string`)

##### The `s.Struct` constructor

`s.Struct({ id: s.String, time: s.Number })` => `{ id: string, time: number }`

##### The `s.Partial` constructor

`s.Partial({ id: s.String, time: s.Number })` => `{ id?: string, time?: number }`

##### The `s.Map` constructor

`s.Map(s.Boolean)` => `Record<string, boolean>`

##### The `s.Array` constructor

`s.Array(s.Number)` => `number[]`

##### The `s.Tuple` constructor

`s.Tuple(s.String, s.Number)` => `[string, number]`

##### The `s.Intersect` constructor

`s.Intersect(s.Struct({ name: s.String }), s.Partial({ age: s.Number }))` => `{ name: string } & { age?: number }`

##### The `s.Union` constructor

`s.Union(s.String, s.Number)` => `string | number`

##### The `s.Enum` constructor

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

#### Brand

- the `s.OidLiteral` is string with ObjectID constraint, it uses `ObjectId.valid`.
- the `s.UrlLiteral` is string with Url constraint, it uses URL constructor to validate.
- the `s.Int` is number with Integer constraint, it uses `Number.isInteger`.

### Assertion

Say we are using koa(with body-parser), to assert body shape you can

```ts
import { Shape } from "t-shape";
import { Errors } from "./errors";

const Body = Shape.make((s) => S.Struct({ id: s.OidLiteral, text: s.String }));

async function handler(ctx: Context) {
  Shape.assert(ctx.request.body, Body, new Errors.InvalidParams());
  const { id, text } = ctx.request.body; // with type { id: OidLiteral, text: string }
}
```

The third argument can receive a `Error | ErrorContructor`, the Error instance will be threw directly while the ErrorContructor will receive error message as first argument.
By default it's `TypeError` constructor.

## Roadmap

- Add branded type such as Positive(number), Email(string), etc.
